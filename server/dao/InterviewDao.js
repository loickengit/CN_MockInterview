let mysql = require('mysql')
let models = require('../config/config').config
let conn = mysql.createConnection(models.mysql)

conn.connect()

  // `id` int(11) NOT NULL AUTO_INCREMENT,
  // `subject` varchar(255) DEFAULT NULL,
  // `date` datetime DEFAULT NULL,
  // `intervieweeName` varchar(255) DEFAULT NULL,
  // `interviewerName` varchar(255) DEFAULT NULL,
  // `title1Id` int(11) DEFAULT NULL,
  // `title2Id` int(11) DEFAULT NULL,
  // `feedback1Id` int(11) DEFAULT NULL,
  // `feedback2Id` int(11) DEFAULT NULL,
  // `state` int(11) DEFAULT NULL,
  // `room` varchar(255) DEFAULT NULL,
  // `intervieweeEmail` varchar(255) DEFAULT NULL,

/**
 * insert a interview with values
 * @param params
 * @returns {*}
 */
function addInterview (params) {
  let sql = 'insert into interview(date, intervieweeName, interviewerName, title1Id, title2Id, state, room) ' +
    'values (?, ?, ?, ?, ?, ?, ?)'

  return new Promise(function (resolve, reject) {
    conn.query(sql, [params.datetime, params.intervieweeName, params.interviewerName,
              params.title1Id, params.title2Id, 1, ''], function (err, res) {

      if (err) {
        reject(err)
      }else{
        resolve(res)
      }
    })
  })
}

/**
 * delete interview by room and intervieweeName and interviewerName
 * @param room
 * @param intervieweeName
 * @param interviewerName
 * @returns {*}
 */
function deleteInterviewByRoom(room, intervieweeName, interviewerName){
  let sql = 'delete from interview where room = ? and intervieweeName = ? and interviewerName = ?'
  return new Promise(function (resolve, reject) {
    conn.query(sql, [room, intervieweeName, interviewerName], function (err, res) {
      console.log(res)
      if (err) {
        reject(err)
      }else{
        resolve(res)
      }
    })
  })
}


exports.addInterview = addInterview


/**
 * test code for functions
 */

let isdev = false

if (isdev) {

// set params
  let params = {
    intervieweeName: 'loick',
    interviewerName: 'dddo',
    title1Id: '1',
    title2Id: '2',
    room: 'hei'
  }

  addInterview(params).then(
    console.log('success')
  )
  params.room = 2
  console.assert()

  addInterview(params).then(
    console.log('success')
  )

  deleteInterviewByRoom(1, 'loick', 'ddda')
    .then(res => {
      if (res) {
        console.log(res)
      }
    })
}
