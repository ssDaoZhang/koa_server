const Mysql = require('mysql-pro');
const config = require('../config');
  
//连接数据库
let db  = new Mysql({
    mysql:{//注意给定数据库类型
        host:       config.db_host,
        port:       config.db_port,
        user:       config.db_user,
        password:   config.db_password,
        database:   config.db_base
    }
});

db.execute = async (sql, paramsArr='') => {
    //函数中的db实际上是闭包
    let ret;
    await db.startTransaction();
    if(typeof sql == 'string'){      
        if(paramsArr == ''){
            //db不能丢
            ret = await db.executeTransaction(sql); 
        }else{
            ret = await db.executeTransaction(sql, paramsArr);
        } 
    }else{
        sql.forEach(async (ele, index)=>{
            if(paramsArr.length == 0){
                ret = await db.executeTransaction(ele);
            }else{
                ret = await db.executeTransaction(ele, paramsArr[index]);
            } 
        });
    }
    await db.stopTransaction()
    return ret;
}
module.exports = db;