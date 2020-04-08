
let mysql = require('mysql')
let Promise = require('promise');
let models = require('../config/config').config
let conn = mysql.createConnection(models.mysql);
const DATE_FORMATER = require( 'dateformat' );


function addInterviewRecord(interviewRecords) {

}

function updateInterviewRecord(record){

}

/**
 * find all interview records by username
 * @param name
 * @returns {Promise}
 */
function getAllRecordsByUser(name){
  let sql = 'select * from interview where intervieweeName = ?';
  return new Promise(function (resolve, reject) {
    conn.query(sql, [name], function (error, results, fields) {
      if (error) throw error;

      // todo
      // do filter in sql
      // let datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
      let nowtime = new Date().getTime();
      let res = results.filter(record => !(record.state === 0 && record.date.getTime() < nowtime))
      resolve(res);
    })
  })

}


exports.addInterviewRecord = addInterviewRecord
exports.getAllRecordsByUser = getAllRecordsByUser
exports.updateInterviewRecord = updateInterviewRecord



/**
 * unit test
 */
let isDev = false

if (isDev){
  getAllRecordsByUser('loick').then(res => {
    console.log(res)
  })
}


