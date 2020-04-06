<template>
  <div>
    <div class="row block">
      <editor id="editor" ref="editor" @init="editorInit" width="1000" height="600"></editor>
    </div>
    <div>
      <video id="localVideo" autoplay muted></video>
      <video id="remoteVideo" autoplay></video>
    </div>
  </div>
</template>

<script>
  navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
  window.RTCSessionDescription =
    window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

  import api from '../API/BasicAxios'

  export default {
    name: 'coding',
    components: {
      editor: require('vue2-ace-editor'),
    },

    data() {
      return {
        problem: {
          isConnected: false,
          title: '1. 两数之和\n',
          description: '# 描述：给定一个整数数组nums和一个目标值target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。'+
            '你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。\n',
          example: '\n # 例子：给定 nums = [2, 7, 11, 15], target = 9',
        },
        roomHash: '',
        configuration: {
          iceServers: [{
            urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
          }]
        },
        room: '',
        drone: '',
        pc: '',
        isOfferer: '',
        roomName: '',
      }
    },
    sockets: {
      connect() {
        // Fired when the socket connects.
        this.isConnected = true;
      },

      disconnect() {
        this.isConnected = false;
      },

      /**
       * editor content changed
       * @param delta, delta.start, delta.end, delta.lines, delta.action
       */
      updateContent(delta) {
        let editor = this.$refs.editor.editor
        let lines = delta.lines
        let range = {start: delta.start, end: delta.end}
        if (delta.action === 'insert') {
          let text = lines.join('\n')
          editor.session.replace(range, text)
        } else if(delta.action === 'remove') {
          editor.session.replace(range, '')
        }
      }
    },

    methods: {
      onSuccess: function(){},
      onError: function(error){
        console.error(error)
      },
      // Send signaling data via Scaledrone
      sendMessage: function (message) {
        this.drone.publish({
          room: this.roomName,
          message
        });
      },
      startWebRTC: function (isOfferer) {
        this.pc = new RTCPeerConnection(this.configuration);

        this.pc.onicecandidate = event => {
          if (event.candidate) {
            this.sendMessage({'candidate': event.candidate});
          }
        };

        // If user is offerer let the 'negotiationneeded' event create the offer
        if (isOfferer) {
          this.pc.onnegotiationneeded = () => {
            this.pc.createOffer().then(this.localDescCreated).catch(this.onError);
          }
        }

        // When a remote stream arrives display it in the #remoteVideo element
        let remoteVideo = document.getElementById('remoteVideo');
        this.pc.onaddstream = event => {
          remoteVideo.srcObject = event.stream;
        };

        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        }).then(stream => {
          // Display your local video in #localVideo element
          let localVideo = document.getElementById('localVideo');
          localVideo.srcObject = stream;
          // Add your stream to be sent to the conneting peer
          this.pc.addStream(stream);
        }, this.onError);
      },
      startListentingToSignals: function() {
        // Listen to signaling data from Scaledrone
        this.room.on('data', (message, client) => {
          // Message was sent by us
          if (!client || client.id === this.drone.clientId) {
            return;
          }
          if (message.sdp) {
            // This is called after receiving an offer or answer from another peer
            this.pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
              // When receiving an offer lets answer it
              if (this.pc.remoteDescription.type === 'offer') {
                this.pc.createAnswer().then(this.localDescCreated).catch(onError);
              }
            }, onError);
          } else if (message.candidate) {
            // Add the new ICE candidate to our connections remote description
            this.pc.addIceCandidate(
              new RTCIceCandidate(message.candidate), this.onSuccess, onError
            );
          }
        });
      },
      localDescCreated: function(desc) {
        this.pc.setLocalDescription(
          desc,
          () => this.sendMessage({'sdp': this.pc.localDescription}),
          onError
        );
      },
      editorInit: function () {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/theme/dawn')


        let editor = this.$refs.editor.editor
        editor.setOptions({theme: "ace/theme/monokai",
          mode: "ace/mode/html",
          wrap: true,
          autoScrollEditorIntoView: true,
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true
        })
        // editor.session.setMode("ace/mode/javascript");
        // editor.setTheme("ace/theme/tomorrow");
        // editor.setHighlightActiveLine(true)

        let problem_text = this.problem.title + this.problem.description + this.problem.example;
        editor.setValue(problem_text)
        let outThis = this
        editor.on('change', function(delta) {
          outThis.$socket.emit('contentChange', delta)
        })
      },
    },
    mounted () {
      api.enterRoom(localStorage.getItem("USERID")).then(res => {
        // Generate random room name if needed
        let data = res.data
        if (!data.roomHash && !location.hash) {
          location.hash = Math.floor(Math.random() * 0xFFFFFF).toString(16);
          this.roomHash = location.hash.substring(1);
          return api.createRoom(localStorage.getItem("USERID"), this.roomHash)
        }else{
          this.roomHash = data.roomHash
          location.hash = '#' + data.roomHash
          return
        }
      }).then(res => {
        // Room name needs to be prefixed with 'observable-'
        this.roomName = 'observable-' + this.roomHash;
        this.drone = new ScaleDrone('hjEUkEW3exRjjOjk');
        let drone = this.drone
        drone.on('open', error => {
          if (error) {
            return onError(error);
          }
          this.room = drone.subscribe(this.roomName);
          this.room.on('open', error => {
            if (error) {
              onError(error);
            }
          });
          // We're connected to the room and received an array of 'members'
          // connected to the room (including us). Signaling server is ready.
          this.room.on('members', members => {
            if (members.length >= 3) {
              return alert('The room is full');
            }
            // If we are the second user to connect to the room we will be creating the offer
            this.isOfferer = members.length === 2;
            this.startWebRTC(this.isOfferer);
            this.startListentingToSignals();
          });
        });
      })
    }
  }

</script>

<style scoped>
  #editor {
    position: relative;
    top: 10%;
    right: 10%;
    margin-left: 10%;
    bottom: 10%;
    font-size: 16px;
  }

  #question{
    text-align: left;
    /*margin-left: 10%;*/
  }

  .block{
    margin-left: 2%;
  }

  .code {
    box-sizing: border-box;
    color: #263238;
    line-height: 1.6;
    background: azure;
  }

</style>

