// node 后端服务器

const userApi = require('./service/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express')
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const iolib = require('./connector/io.js')
const cors = require('cors')
const history = require('connect-history-api-fallback');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('dist');
app.use(history())
app.use(staticFileMiddleware);

/***
 * Cross Origin Resources Sharing
 */
app.use(cors())

/**
 * init socket channel
 */
iolib.init(io)

// 监听端口
server.listen(3000);
console.log('success listen at port:3000......');


