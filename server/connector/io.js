let _ = require('lodash')

/**
 * {
 *  channel: {
 *     socketid: {
 *         channel: ''
 *         user: ''
 *         socket:
 *     }
 *  }
 *  ...
 * }
 */
// let sockets = {}
let sockets = {}

function init(io){
  io.on('connection', function(socket){
    console.log("user connected");
    socket.on('disconnect', function(){
      // console.log("user left");
    });
    let body = "type in text";
    socket.emit('refresh', {body: body});

    let channel = 'code'
    if (!sockets[channel]) {
      sockets[channel] = []
    }
    sockets[channel].push(socket)
    let exclude = [socket]

    socket.on('contentChange', function(delta){
      // console.log(socket)
      broadcast('updateContent', 'code', delta, exclude)
      broadcast('messageChannel', 'code', delta, exclude)
    })

  })
}

function broadcast(event, channel, data, exclude) {
  let s = sockets[channel];
  s = _.filter(s, socket => !exclude.includes(socket))
  _.each(s, function (socket) {
    socket.emit(event, data);
  });
}

module.exports = {
  init: init,
};

