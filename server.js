var express = require('express'),/*引入express架构*/
  cookieParser = require('cookie-parser'),/*引入中间件*/
  bodyParser = require('body-parser'),/*引入中间件*/
  http = require('http'),/*引入http模块*/
  path = require('path'),/*引入http模块*/
  io = require('socket.io'),/*引入http模块*/
  mongoose = require('mongoose'),/*引入mongoose模块*/
  app = express(),
  db,
  userRoutes,
  socketIO;

/* 数据库连接 后台显示是否连接成功*/
mongoose.connect('mongodb://localhost:27017/chatroom');
db = mongoose.connection;
db.on('error', console.error.bind(console, '数据库连接失败!'));
db.once('open', function callback() {
  console.log('数据库连接成功！');
});

/*Express 配置*/
app.use(cookieParser());/*使用中间件对http传入的cookie进行解析*/
app.use(bodyParser.json()); /*解析json格式的中间件接受任何body中任何Unicode编码的字符*/
app.use(bodyParser.urlencoded({ extended: true }));/*解析body中的urlencoded字符， 只支持utf-8的编码的字符*/
app.use(express.static(path.join(__dirname, 'public')));/*制定静态文件路径*/


http=http.createServer(app,function(req,res){
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
});
io = io(http);

indexRoutes = require('./routes/index')(app)/*制定路由*/
userRoutes = require('./routes/users')(app);

/*绑定io到服务器上，监听3000端口*/
socketIO = require('./socketIO')(app, io);

http.listen(3000, function () {
  console.log('listening on *:3000');
});