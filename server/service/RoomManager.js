

let roomQueue = []

exports.getRoomHash = function () {
  let res = roomQueue.pop()
  return res
}

exports.createRoomHash = function (userId, roomHash) {
  roomQueue.push([userId, roomHash])
}
