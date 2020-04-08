

let roomQueue = []

exports.getRoomHash = function () {
  let res = roomQueue.pop()
  return res
}

exports.createRoomHash = function (userId, roomHash) {
  roomQueue.push([userId, roomHash])
}
exports.checkPair = function (roomHash) {
  for (var roomInfo in roomQueue) { 
          if(roomInfo[1]==roomHash)return false;
   }
   return true;
}