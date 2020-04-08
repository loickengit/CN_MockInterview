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


exports.addInterview = addInterview


/**
 * test code for functions
 */
// let params = {
//   intervieweeName: 'loick',
//   interviewerName: 'dddo',
//   title1Id: '1',
//   title2Id: '2',
//   room: 'hei'
// }
// addInterview(params).then(console.log('success'))
