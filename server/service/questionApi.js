var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

let models = require('../config/config').config



// 增加上传问题接口
router.post('/addQuestion', (req, res) => {
  console.log('add question')
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
	var sql = $sql.question.add;
	var params = req.body;
	//console.log(params.email);
	conn.query(sql, [params.name, params.content, params.hint, params.answer, params.type], function (err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
	conn.end();
});

module.exports = router;