const Koa = require('koa');
const Router = require('koa-router');
const betterBody = require('koa-better-body');
const convert = require('koa-convert');
const staticCache = require('koa-static-cache');
const session = require('koa-session');
const pathlib = require('path');
const ejs = require('koa-ejs');
const loglib = require('./lib/userLog');

const config = require('./config');
const errHander = require('./lib/error');

let server = new Koa();

//设置是否解析请求地址的ip
server.proxy = true;

if(!config.ser_IP){
    server.listen(config.ser_port);
}else{
    server.listen(config.ser_port , config.ser_IP);
}

//try catch
errHander(server);
loglib(server);

//连接数据库
let db = require('./lib/db');
server.use(async (ctx,next) => {
    ctx.db = db;
    await next();
});

//session
server.keys = config.ser_keys;
server.use(session({}, server));

//post
server.use(convert(betterBody({
    uploadDir:config.uploadDir
})));

ejs(server, {
    root:pathlib.resolve('./template'),//模板文件名
    layout:false,//全局布局文件(string), 设置false禁用布局文件
    viewExt:'.ejs.html',//模板文件后缀名，默认html
    cache:false,//缓存完成的模板，默认是true(开启), 调试阶段不开启
    debug: false//是否开启调试缓存，默认true(开启)
    // async:true,//为true是采用异步渲染
});
    // delimiter:'自定义ejs动态渲染区域分隔标志',//默认为%
    

//router
let mainRouter = new Router();
server.use(mainRouter.routes());
mainRouter.use('/', require('./routers/index'));//主页
// mianRouter.use('/a', require('./routers/a'));
// mianRouter.use('/b', require('./routers/b'));
// mianRouter.use('/c', require('./routers/c'));

//静态服务
server.use(staticCache(config.staticDir, {
    gzip:true
}));