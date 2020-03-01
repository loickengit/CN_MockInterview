
let mysql = require('mysql')
let Promise = require('promise');
let models = require('../config/config').config
let conn = mysql.createConnection(models.mysql);


function addInterviewRecord(interviewRecords) {

}

function updateInterviewRecord(record){

}

function getAllRecordsByUser(name){
  let sql = 'select * from interview where intervieweeName = ?';
  return new Promise(function (resolve, reject) {
    conn.query(sql, [name], function (error, results, fields) {
      if (error) throw error;
      resolve(results);
    })
  })

}


exports.addInterviewRecord = addInterviewRecord
exports.getAllRecordsByUser = getAllRecordsByUser
exports.updateInterviewRecord = updateInterviewRecord
