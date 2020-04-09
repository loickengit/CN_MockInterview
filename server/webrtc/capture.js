/* globals main */

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

/* globals main, MediaRecorder */

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

const canvas = document.querySelector('canvas');
const video = document.querySelector('video');

const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecording;
playButton.onclick = play;
downloadButton.onclick = download;

// Start the GL teapot on the canvas
main();

const stream = canvas.captureStream(); // frames per second
console.log('Started stream capture from canvas element: ', stream);

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
  const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  video.src = window.URL.createObjectURL(superBuffer);
}

function toggleRecording() {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
}

// The nested try blocks will be simplified when Chrome 47 moves to Stable
function startRecording() {
  let options = {mimeType: 'video/webm'};
  recordedBlobs = [];
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e0) {
    console.log('Unable to create MediaRecorder with options Object: ', e0);
    try {
      options = {mimeType: 'video/webm,codecs=vp9'};
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e1) {
      console.log('Unable to create MediaRecorder with options Object: ', e1);
      try {
        options = 'video/vp8'; // Chrome 47
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e2) {
        alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, ' +
          'with Enable experimental Web Platform features enabled from chrome://flags.');
        console.error('Exception while creating MediaRecorder:', e2);
        return;
      }
    }
  }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(100); // collect 100ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
  video.controls = true;
}

function play() {
  video.play();
}

function download() {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

const srcVideo = document.getElementById('srcVideo');
const motionVideo = document.getElementById('motionVideo');
const detailVideo = document.getElementById('detailVideo');

let srcStream;
let motionStream;
let detailStream;

const offerOptions = {
  offerToReceiveAudio: 0,
  offerToReceiveVideo: 1
};

function maybeCreateStream() {
  if (srcStream) {
    return;
  }
  if (srcVideo.captureStream) {
    srcStream = srcVideo.captureStream();
    call();
  } else {
    console.log('captureStream() not supported');
  }
}

// Video tag capture must be set up after video tracks are enumerated.
srcVideo.oncanplay = maybeCreateStream;
if (srcVideo.readyState >= 3) { // HAVE_FUTURE_DATA
                                // Video is already ready to play, call maybeCreateStream in case oncanplay
                                // fired before we registered the event handler.
  maybeCreateStream();
}

srcVideo.play();

function setVideoTrackContentHints(stream, hint) {
  const tracks = stream.getVideoTracks();
  tracks.forEach(track => {
    if ('contentHint' in track) {
      track.contentHint = hint;
      if (track.contentHint !== hint) {
        console.log('Invalid video track contentHint: \'' + hint + '\'');
      }
    } else {
      console.log('MediaStreamTrack contentHint attribute not supported');
    }
  });
}

function call() {
  // This creates multiple independent PeerConnections instead of multiple
  // streams on a single PeerConnection object so that b=AS (the bitrate
  // constraints) can be applied independently.
  motionStream = srcStream.clone();
  // TODO(pbos): Remove fluid when no clients use it, motion is the newer name.
  setVideoTrackContentHints(motionStream, 'fluid');
  setVideoTrackContentHints(motionStream, 'motion');
  establishPC(motionVideo, motionStream);
  detailStream = srcStream.clone();
  // TODO(pbos): Remove detailed when no clients use it, detail is the newer
  // name.
  setVideoTrackContentHints(detailStream, 'detailed');
  setVideoTrackContentHints(detailStream, 'detail');
  establishPC(detailVideo, detailStream);
}

function establishPC(videoTag, stream) {
  const pc1 = new RTCPeerConnection(null);
  const pc2 = new RTCPeerConnection(null);
  pc1.onicecandidate = e => {
    onIceCandidate(pc1, pc2, e);
  };
  pc2.onicecandidate = e => {
    onIceCandidate(pc2, pc1, e);
  };
  pc2.ontrack = event => {
    if (videoTag.srcObject !== event.streams[0]) {
      videoTag.srcObject = event.streams[0];
    }
  };

  stream.getTracks().forEach(track => pc1.addTrack(track, stream));

  pc1.createOffer(offerOptions)
    .then(desc => {
      pc1.setLocalDescription(desc)
        .then(() => pc2.setRemoteDescription(desc))
        .then(() => pc2.createAnswer())
        .then(answerDesc => onCreateAnswerSuccess(pc1, pc2, answerDesc))
        .catch(onSetSessionDescriptionError);
    })
    .catch(e => console.log('Failed to create session description: ' + e.toString()));
}

function onSetSessionDescriptionError(error) {
  console.log('Failed to set session description: ' + error.toString());
}

function onCreateAnswerSuccess(pc1, pc2, desc) {
  // Hard-code video bitrate to 50kbps.
  desc.sdp = desc.sdp.replace(/a=mid:(.*)\r\n/g, 'a=mid:$1\r\nb=AS:' + 50 + '\r\n');
  pc2.setLocalDescription(desc)
    .then(() => pc1.setRemoteDescription(desc))
    .catch(onSetSessionDescriptionError);
}

function onIceCandidate(pc, otherPc, event) {
  otherPc.addIceCandidate(event.candidate);
}

const leftVideo = document.getElementById('leftVideo');
const rightVideo = document.getElementById('rightVideo');

let stream;

let pc1;
let pc2;
const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

let startTime;

function maybeCreateStream() {
  if (stream) {
    return;
  }
  if (leftVideo.captureStream) {
    stream = leftVideo.captureStream();
    console.log('Captured stream from leftVideo with captureStream',
      stream);
    call();
  } else if (leftVideo.mozCaptureStream) {
    stream = leftVideo.mozCaptureStream();
    console.log('Captured stream from leftVideo with mozCaptureStream()',
      stream);
    call();
  } else {
    console.log('captureStream() not supported');
  }
}

// Video tag capture must be set up after video tracks are enumerated.
leftVideo.oncanplay = maybeCreateStream;
if (leftVideo.readyState >= 3) { // HAVE_FUTURE_DATA
                                 // Video is already ready to play, call maybeCreateStream in case oncanplay
                                 // fired before we registered the event handler.
  maybeCreateStream();
}

leftVideo.play();

rightVideo.onloadedmetadata = () => {
  console.log(`Remote video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
};

rightVideo.onresize = () => {
  console.log(`Remote video size changed to ${rightVideo.videoWidth}x${rightVideo.videoHeight}`);
  // We'll use the first onresize callback as an indication that
  // video has started playing out.
  if (startTime) {
    const elapsedTime = window.performance.now() - startTime;
    console.log('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
    startTime = null;
  }
};

function call() {
  console.log('Starting call');
  startTime = window.performance.now();
  const videoTracks = stream.getVideoTracks();
  const audioTracks = stream.getAudioTracks();
  if (videoTracks.length > 0) {
    console.log(`Using video device: ${videoTracks[0].label}`);
  }
  if (audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }
  const servers = null;
  pc1 = new RTCPeerConnection(servers);
  console.log('Created local peer connection object pc1');
  pc1.onicecandidate = e => onIceCandidate(pc1, e);
  pc2 = new RTCPeerConnection(servers);
  console.log('Created remote peer connection object pc2');
  pc2.onicecandidate = e => onIceCandidate(pc2, e);
  pc1.oniceconnectionstatechange = e => onIceStateChange(pc1, e);
  pc2.oniceconnectionstatechange = e => onIceStateChange(pc2, e);
  pc2.ontrack = gotRemoteStream;

  stream.getTracks().forEach(track => pc1.addTrack(track, stream));
  console.log('Added local stream to pc1');

  console.log('pc1 createOffer start');
  pc1.createOffer(onCreateOfferSuccess, onCreateSessionDescriptionError, offerOptions);
}

function onCreateSessionDescriptionError(error) {
  console.log(`Failed to create session description: ${error.toString()}`);
}

function onCreateOfferSuccess(desc) {
  console.log(`Offer from pc1
${desc.sdp}`);
  console.log('pc1 setLocalDescription start');
  pc1.setLocalDescription(desc, () => onSetLocalSuccess(pc1), onSetSessionDescriptionError);
  console.log('pc2 setRemoteDescription start');
  pc2.setRemoteDescription(desc, () => onSetRemoteSuccess(pc2), onSetSessionDescriptionError);
  console.log('pc2 createAnswer start');
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  pc2.createAnswer(onCreateAnswerSuccess, onCreateSessionDescriptionError);
}

function onSetLocalSuccess(pc) {
  console.log(`${getName(pc)} setLocalDescription complete`);
}

function onSetRemoteSuccess(pc) {
  console.log(`${getName(pc)} setRemoteDescription complete`);
}

function onSetSessionDescriptionError(error) {
  console.log(`Failed to set session description: ${error.toString()}`);
}

function gotRemoteStream(event) {
  if (rightVideo.srcObject !== event.streams[0]) {
    rightVideo.srcObject = event.streams[0];
    console.log('pc2 received remote stream', event);
  }
}

function onCreateAnswerSuccess(desc) {
  console.log(`Answer from pc2:
${desc.sdp}`);
  console.log('pc2 setLocalDescription start');
  pc2.setLocalDescription(desc, () => onSetLocalSuccess(pc2), onSetSessionDescriptionError);
  console.log('pc1 setRemoteDescription start');
  pc1.setRemoteDescription(desc, () => onSetRemoteSuccess(pc1), onSetSessionDescriptionError);
}

function onIceCandidate(pc, event) {
  getOtherPc(pc).addIceCandidate(event.candidate)
    .then(
      () => onAddIceCandidateSuccess(pc),
      err => onAddIceCandidateError(pc, err)
    );
  console.log(`${getName(pc)} ICE candidate:
${event.candidate ?
    event.candidate.candidate : '(null)'}`);
}

function onAddIceCandidateSuccess(pc) {
  console.log(`${getName(pc)} addIceCandidate success`);
}

function onAddIceCandidateError(pc, error) {
  console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
}

function onIceStateChange(pc, event) {
  if (pc) {
    console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
    console.log('ICE state change event: ', event);
  }
}

function getName(pc) {
  return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}

const source = document.querySelector('#source');
// TODO(hta): Use OffscreenCanvas for the intermediate canvases.
const canvasIn = document.querySelector('#canvas-source');
const canvasOut = document.querySelector('#canvas-result');
const result = document.querySelector('#result');

const stream = canvasOut.captureStream();
let inputStream = null;
let imageData = null;
let transformStream = null;
let writer = null;
let reader = null;

result.srcObject = stream;

function loop() {
  if (source.videoWidth > 0 && source.videoHeight > 0) {
    canvasIn.width = source.videoWidth;
    canvasIn.height = source.videoHeight;
    const ctx = canvasIn.getContext('2d');
    ctx.drawImage(source, 0, 0);
    // Put a red square into the image, to mark it as "processed".
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(10, 10, 80, 80);
    imageData = ctx.getImageData(0, 0, canvasIn.width, canvasIn.height);
    // At this point, we have data that can be transferred.
    writer.write(imageData);
  }
  window.requestAnimationFrame(loop);
}

// The read function paints the incoming data on the second canvas.
const readData = async () => {
  const result = await reader.read();
  if (!result.done) {
    canvasOut.width = source.videoWidth;
    canvasOut.height = source.videoHeight;
    const outCtx = canvasOut.getContext('2d');
    outCtx.putImageData(result.value, 0, 0);
    readData();
  }
};

(async () => {
  inputStream = await navigator.mediaDevices.getUserMedia({video: true});
  source.srcObject = inputStream;
  transformStream = new TransformStream();
  writer = transformStream.writable.getWriter();

  const myWorker = new Worker('js/worker.js');
  myWorker.onmessage = function(e) {
    reader = e.data[1].getReader();
    // Start the flow of data.
    readData();
    window.requestAnimationFrame(loop);
  };
  myWorker.postMessage(['stream', transformStream.readable],
    [transformStream.readable]);
  source.play();
  result.play();
})();

const videoElement = document.getElementById('video');

let extensionInstalled = false;

document.getElementById('start').addEventListener('click', function() {
  // send screen-sharer request to content-script
  if (!extensionInstalled) {
    const message = 'Please install the extension:\n' +
      '1. Go to chrome://extensions\n' +
      '2. Check: "Enable Developer mode"\n' +
      '3. Click: "Load the unpacked extension..."\n' +
      '4. Choose "extension" folder from the repository\n' +
      '5. Reload this page';
    alert(message);
  }
  window.postMessage({type: 'SS_UI_REQUEST', text: 'start'}, '*');
});

// listen for messages from the content-script
window.addEventListener('message', function(event) {
  if (event.origin !== window.location.origin) {
    return;
  }

  // content-script will send a 'SS_PING' msg if extension is installed
  if (event.data.type && (event.data.type === 'SS_PING')) {
    extensionInstalled = true;
  }

  // user chose a stream
  if (event.data.type && (event.data.type === 'SS_DIALOG_SUCCESS')) {
    startScreenStreamFrom(event.data.streamId);
  }

  // user clicked on 'cancel' in choose media dialog
  if (event.data.type && (event.data.type === 'SS_DIALOG_CANCEL')) {
    console.log('User cancelled!');
  }
});

function handleSuccess(screenStream) {
  videoElement.srcObject = screenStream;
  videoElement.play();
}

function handleError(error) {
  console.log('getUserMedia() failed: ', error);
}

function startScreenStreamFrom(streamId) {
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: streamId,
        maxWidth: window.screen.width,
        maxHeight: window.screen.height
      }
    }
  };
  navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);
}

import {LitElement, html} from 'https://unpkg.com/@polymer/lit-element@0.6.2/lit-element.js?module';

class ScreenSharing extends LitElement {
  constructor() {
    super();
    this.enableStartCapture = true;
    this.enableStopCapture = false;
    this.enableDownloadRecording = false;
    this.stream = null;
    this.chunks = [];
    this.mediaRecorder = null;
    this.status = 'Inactive';
    this.recording = null;
  }

  static get properties() {
    return {
      status: String,
      enableStartCapture: Boolean,
      enableStopCapture: Boolean,
      enableDownloadRecording: Boolean,
      recording: {
        type: {
          fromAttribute: input => input
        }
      }
    };
  }

  render() {
    return html`<style>
@import "../../../css/main.css";
:host {
  display: block;
  padding: 10px;
  width: 100%;
  height: 100%;
}
video {
    --video-width: 100%;
    width: var(--video-width);
    height: calc(var(--video-width) * (16 / 9));
}
</style>
<video ?controls="${this.recording !== null}" playsinline autoplay loop muted .src="${this.recording}"></video>
<div>
<p>Status: ${this.status}</p>
<button ?disabled="${!this.enableStartCapture}" @click="${e => this._startCapturing(e)}">Start screen capture</button>
<button ?disabled="${!this.enableStopCapture}" @click="${e => this._stopCapturing(e)}">Stop screen capture</button>
<button ?disabled="${!this.enableDownloadRecording}" @click="${e => this._downloadRecording(e)}">Download recording</button>
<a id="downloadLink" type="video/webm" style="display: none"></a>
</div>`;
  }

  static _startScreenCapture() {
    if (navigator.getDisplayMedia) {
      return navigator.getDisplayMedia({video: true});
    } else if (navigator.mediaDevices.getDisplayMedia) {
      return navigator.mediaDevices.getDisplayMedia({video: true});
    } else {
      return navigator.mediaDevices.getUserMedia({video: {mediaSource: 'screen'}});
    }
  }

  async _startCapturing(e) {
    console.log('Start capturing.');
    this.status = 'Screen recording started.';
    this.enableStartCapture = false;
    this.enableStopCapture = true;
    this.enableDownloadRecording = false;
    this.requestUpdate('buttons');

    if (this.recording) {
      window.URL.revokeObjectURL(this.recording);
    }

    this.chunks = [];
    this.recording = null;
    this.stream = await ScreenSharing._startScreenCapture();
    this.stream.addEventListener('inactive', e => {
      console.log('Capture stream inactive - stop recording!');
      this._stopCapturing(e);
    });
    this.mediaRecorder = new MediaRecorder(this.stream, {mimeType: 'video/webm'});
    this.mediaRecorder.addEventListener('dataavailable', event => {
      if (event.data && event.data.size > 0) {
        this.chunks.push(event.data);
      }
    });
    this.mediaRecorder.start(10);
  }

  _stopCapturing(e) {
    console.log('Stop capturing.');
    this.status = 'Screen recorded completed.';
    this.enableStartCapture = true;
    this.enableStopCapture = false;
    this.enableDownloadRecording = true;

    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.stream.getTracks().forEach(track => track.stop());
    this.stream = null;

    this.recording = window.URL.createObjectURL(new Blob(this.chunks, {type: 'video/webm'}));
  }

  _downloadRecording(e) {
    console.log('Download recording.');
    this.enableStartCapture = true;
    this.enableStopCapture = false;
    this.enableDownloadRecording = false;

    const downloadLink = this.shadowRoot.querySelector('a#downloadLink');
    downloadLink.addEventListener('progress', e => console.log(e));
    downloadLink.href = this.recording;
    downloadLink.download = 'screen-recording.webm';
    downloadLink.click();
  }
}

customElements.define('screen-sharing', ScreenSharing);
