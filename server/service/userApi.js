var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

let models = require('../config/config').config
let roomManager = require('./RoomManager')

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
  console.log('add user')
	// 连接数据库
	var conn = mysql.createConnection(models.mysql);
	conn.connect();
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
	//console.log(params.email);
	conn.query(sql, [params.username, params.password, params.email], function (err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
	conn.end();
});
// 增加用户登录验证接口
router.post('/authUser', (req, res) => {
	// 连接数据库
	var conn = mysql.createConnection(models.mysql);
	conn.connect();
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
	conn.end();
});

// 增加面试接口
router.post('/addInterview', (req, res) => {
	var conn = mysql.createConnection(models.mysql);
	conn.connect();
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
	var sql = $sql.interview.add;
	var sqlSelect = $sql.interview.select;
	var sqlUpdate=$sql.interview.update;
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.subject, params.datetime,params.intervieweeId,0,params.intervieweeEmail], function (err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			console.log(result);
			conn.query(sqlSelect, [0], function (errSelect, resultSelect) {
				if(errSelect){
					console.log(errSelect)
				}
				// 进行面试者匹配 state=0->未匹配 state=1->匹配成功 state=2->面试完成 state=3->面试取消
				// 匹配规则：系统自动按照主题和时间为用户匹配面试，在面试中，用户既要成为面试官为同伴面试，也要被同伴面试一次。当用户预约面试时，默认用户为面试者
				else{
					console.log(resultSelect[0])
					var dataString = JSON.stringify(resultSelect);
					var data = JSON.parse(dataString);
					console.log(data);
					for(var i=0;i<data.length;i++){
						for(var j=i+1;j<data.length;j++){
							if(data[i].subject==data[j].subject && data[i].date==data[j].date && data[i].state==data[j].state && data[i].state==0){
								data[i].state=1;
								data[j].state=1;
								var emailObject={
									email1:data[i].intervieweeEmail,
									email2:data[j].intervieweeEmail,
									date:data[i].date
								};
								conn.query(sqlUpdate, [data[i].id,data[j].intervieweeId,data[j].id,data[i].intervieweeId,data[i].id,data[j].id], function (errUpdate, resultUpdate) {
									if(errUpdate){
										console.log(errUpdate);
									}else{
										// 邮件通知
// 										console.log(emailObject.email1)
// 										console.log(emailObject.email2)
// 										// 设置邮件内容
// 										var mailOptions = {
// 										  from: "CN_MockInterview <996723611@qq.com>", // 发件地址
// 										  to: emailObject.email1, // 收件列表
// 										  cc:emailObject.email2,
// 										  subject: "Mock Interview Notice", // 标题
// 										  text: "Hello, your interview request has been successfully matched. The time is "+emailObject.date+". Room number is 701, please be on time." // text 内容
// 										}
//
// 										// 发送邮件
// 										transport.sendMail(mailOptions, function(errorEmail, responseEmail) {
// 										  if (errorEmail) {
// 											console.error(errorEmail);
// 										  } else {
// 											console.log(responseEmail);
// 										  }
// 										  transport.close(); // 如果没用，关闭连接池
// 										});
										console.log(resultUpdate);
									}
								})
							}
						}
					}
					console.log(data)
					console.log(data[0].intervieweeEmail)
				}
			});
			jsonWrite(res, result);
		}
	})
	// conn.end();
});
// 增加反馈接口
router.post('/addFeedback', (req, res) => {
	var conn = mysql.createConnection(models.mysql);
	conn.connect();
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
	conn.end();
});
// 查询反馈表
router.post('/selectFeedback', (req, res) => {
	var conn = mysql.createConnection(models.mysql);
	conn.connect();
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
	var sql = $sql.feedback.select;
	var params = req.body;
	conn.query(sql, [params.intervieweeId,params.interviewerId], (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result)
		}
	});
	conn.end();
});
// 查询面试表
router.post('/selectInterview', (req, res) => {
  var conn = mysql.createConnection(models.mysql);
  conn.connect();
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
  var sql = $sql.interview.getInfo;
  var params = req.body;
  conn.query(sql, [params.intervieweeId], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result)
    }
  });
  conn.end();
});
router.get('/getRoomHash', (req, res) =>{
  let roomInfo = roomManager.getRoomHash()
  let data = {}
  if (roomInfo){
    data = {
      userId: roomInfo[0],
      roomHash: roomInfo[1]
    }
  }
  res.send(JSON.stringify(data))

})

router.post('/createRoom', (req, res) => {
  let params = req.body
  roomManager.createRoomHash(params.userId, params.roomHash)
  res.json({})
})

module.exports = router;
