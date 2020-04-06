var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

let models = require('../config/config').config

// 增加上传帖子接口
router.post('/addPost', (req, res) => {
    console.log('add post')
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
      var sql = $sql.post.add;
      var params = req.body;
      //console.log(params.email);
      conn.query(sql, [params.title, params.content, params.id, params.time,"实习"], function (err, result) {
          if (err) {
              console.log(err);
          }
          if (result) {
              jsonWrite(res, result);
          }
      })
      conn.end();
  });

  // 增加获取帖子接口
router.get('/getPosts', (req, res) => {
    console.log('get post')
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
      var sql = $sql.post.get;
      var params = req.body;
      //console.log(params.email);
      conn.query(sql, function (err, result) {
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