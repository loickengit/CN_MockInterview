let mysql = require('mysql')
let models = require('../config/config').config
let conn = mysql.createConnection(models.mysql)

conn.connect()

  // `id` int(11) NOT NULL AUTO_INCREMENT,
  // `title` varchar(255) DEFAULT NULL,
  // `description` varchar(255) DEFAULT NULL,
  // `hints` varchar(255) DEFAULT NULL,
  // `answer` varchar(255) DEFAULT NULL,
  // `subject` varchar(255) DEFAULT NULL,

/**
 * select a random question from table question
 * @returns {*}
 */
function selectRandomProblem () {
  let sql = "select * from question order by rand() limit 1;"
  return new Promise(function (resolve, reject) {
    conn.query(sql, [], function (err, res) {
      if (err){
        reject(err)
      }
      console.log(res)
      resolve(res.id)
    })
  })
}

/**
 * find a record from question by question id
 * @param pid
 * @returns {*}
 */
function findProblemById (pid) {
  let sql = "select * from question where id = ?";
  return new Promise(function (resolve, reject) {
    conn.query(sql, [pid], function (err, res) {
      if (err){
        reject(err)
      }else{
        resolve(res)
      }
    })
  })
}


// exports api
exports.selectRandomProblem = selectRandomProblem
exports.findProblemById = findProblemById
