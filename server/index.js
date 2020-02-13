// node 后端服务器

const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const iolib = require('./CodingInterview/io.js')
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);

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


