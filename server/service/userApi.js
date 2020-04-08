var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

let models = require('../config/config').config
let roomManager = require('./RoomManager')
let interviewDao = require('../dao/InterviewDao')
let problemDao = require('../dao/QuestionDao')
let interViewService = require('./InterviewService')

let conn = mysql.createConnection(models.mysql)
conn.connect()

// var nodemailer = require("nodemailer");
// // 开启一个 SMTP 连接池
// var transport = nodemailer.createTransport({
//   host: "smtp.qq.com", // 主机
//   secure: true, // 使用 SSL
//   port: 465, // SMTP 端口
//   auth: {
//     user: "", // 账号
//     pass: "" // 邮箱授权码
//   }
// });

// 增加用户注册接口
router.post('/addUser', (req, res) => {
	var jsonWrite = function (res, ret) {
		if (typeof ret === 'undefined') {
			res.json({
				code: '1',
				msg: '操作失败'
			});
		} else {
			res.json(ret);
		}
	};
	var sql = $sql.user.add;
	var params = req.body;
	conn.query(sql, [params.username, params.password, params.email], function (err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
});

// 增加用户更新接口
router.post('/updateUser', (req, res) => {
	  var jsonWrite = function (res, ret) {
		  if (typeof ret === 'undefined') {
			  res.json({
				  code: '1',
				  msg: '操作失败'
			  });
		  } else {
			  res.json(ret);
		  }
	  };
	  var sql = $sql.user.update;
	  var params = req.body;
	  //console.log(params.email);
	  conn.query(sql, [ params.name, params.password, params.id], function (err, result) {
		  if (err) {
			  console.log(err);
		  }
		  if (result) {
			  jsonWrite(res, result);
		  }
	  })
  });

// 增加用户登录验证接口
router.post('/authUser', (req, res) => {
	var jsonWrite = function (res, ret,data) {
		if (typeof ret === 'undefined') {
			res.json({
				code: '1',
				msg: '操作失败'
			});
		} else {
			res.json(ret);
		}
	};
	var sql = $sql.user.getpsw;
	var params = req.body;
	conn.query(sql, [params.email], function (err, result) {
		if (err) {
			console.log(err);
			return 'error'
		}
		if (result) {
			console.log(result.length);
			//jsonWrite(res, result);
			if (result.length > 0) {
				if (result[0].password == params.password)
					// jsonWrite(res, result);
					res.json({code:"correct",
						data:result})
				else
					jsonWrite(res, 'incorrect');
			}
			else
				jsonWrite(res, 'not exist');

		}
	})
});

// 增加面试接口
router.post('/addInterview', (req, res) => {
  let data = req.body
  console.log(data)
  let params = {
    intervieweeName: data.intervieweeName,
    state: 0,
    datetime: data.datetime
  }

  interviewDao.addInterview(params).then(result => {
    res.send(JSON.stringify(result))
  })
});

router.post('/addFeedback', (req, res) => {
	var jsonWrite = function (res, ret) {
		if (typeof ret === 'undefined') {
			res.json({
				code: '1',
				msg: '操作失败'
			});
		} else {
			res.json(ret);
		}
	};
	var sql = $sql.feedback.add;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.coding, params.communication, params.solution,params.intervieweeId,params.interviewerId], function (err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
});

// 查询反馈表
router.post('/selectFeedback', (req, res) => {
	var sql = $sql.feedback.select;
	var params = req.body;
	conn.query(sql, [params.intervieweeId,params.interviewerId], (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result)
		}
	});
});

// 查询面试表
router.post('/selectInterviewByUserName', (req, res) => {
  let username = req.body.username
  interViewService.getAllRecordsByUser(username).then(res => {
    res.send(JSON.stringify(res))
  })
});

router.get('/getRoomHash', (req, res) =>{
  let roomInfo = roomManager.getRoomHash()
  let data = {}
  if (roomInfo){
    data = {
      userId: roomInfo[0],
      roomHash: roomInfo[1]
    }

    // 匹配成功，写入面试记录
    let userId1 = req.params.userId,
        userId2 = roomInfo[0]

    // todo
    // 只调用一次
    let pid1 = problemDao.selectRandomProblem(),
        pid2 = problemDao.selectRandomProblem()

    let params = {
      intervieweeName: userId1,
      interviewerName: userId2,
      title1Id: pid1,
      title2Id: pid2
    }
    interviewDao.addInterview(params).then(res => {
      res.send(JSON.stringify(data))
    })
  }
  res.send(JSON.stringify(data))
})

router.post('/createRoom', (req, res) => {
  let params = req.body
  roomManager.createRoomHash(params.userId, params.roomHash)
  res.json({})
})

module.exports = router;
