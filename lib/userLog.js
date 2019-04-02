const fs = require('fs');
const config = require('../config');

module.exports = server => {
    server.use( async (ctx, next) => {
        await new Promise(( resolve, reject) => {
            // console.log(ctx.ip);
            // console.log(ctx.request.ip);
            fs.appendFile(config.logpath, `[日期:${new Date().toLocaleString()}][用户IP:${ctx.ip}][请求方式：${ctx.method}-${ctx.url}]\r\n`,async err=>{
                resolve();
                //写入完成回调
            });
        });
        await next();
    });
}