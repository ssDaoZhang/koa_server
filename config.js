const pathlib = require('path');
module.exports = {
    ser_port:8080,//服务器端口
    ser_IP:'',//服务器IP
    uploadDir:pathlib.resolve('./upload'),//上传文件路径 相对于配置文件解析的绝对路径
    staticDir:pathlib.resolve('./static'),//静态文件路径
    ser_keys:['sadsfdgfdhghfhgfu65u5ugfgb', 'vbbbgrtwdshuikkjhmr45esdvhgfd', 'tyyvcxcswqevfdzt564b56b654vfdb564re54'],//签名秘钥

    db_host:'localhost',
    db_port:'3306',
    db_user:'root',
    db_password:'01261025loy',
    db_base:'zhihu',

    //用户访问日志 路径
    logpath:pathlib.resolve('./log/access.log'),
};