module.exports = server =>{
    server.use(handerErr);
}

async function handerErr(ctx, next){
    try{
        await next();
    }catch(e){
        if(e.errno == 1064){
            ctx.body = '数据库SQL语句错误';
        }else if(e.errno == -4058){
            ctx.body = 'ejs找不到模板';
        }
        // ctx.body = {
        //     msg:'出错了！！！',
        //     err:e
        // };
        console.log(e);
    }
}