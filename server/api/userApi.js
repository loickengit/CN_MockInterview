var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 增加用户注册接口
router.post('/addUser', (req, res) => {
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
					jsonWrite(res, 'correct');
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
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.subject, params.datetime], function (err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
	conn.end();
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
	conn.query(sql, [params.coding, params.communication, params.solution], function (err, result) {
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
	conn.query(sql, [params.intervieweeId], (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result)
		}
	});
	conn.end();
});
module.exports = router;