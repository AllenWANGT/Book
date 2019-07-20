const path = require('path');
const log4js = require('log4js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressStaticGzip = require("express-static-gzip");
const express = require('express');
const app = express();
const logger = log4js.getLogger();
const config = require('../config/config.js');
const borrowRouter = require('./routers/BorrowRouter');
const bookRouter = require('./routers/BookRouter');
const userRouter = require('./routers/UserRouter');
var session = require('express-session');
//var mongoStore = require('connect-mongo')(session);

// Configure log4j
log4js.configure({
    appenders: {
        dateFile: {
            type: 'dateFile',
            filename: `${config.LOGGER_PATH}/logger`,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
        out: {
            type: 'stdout'
        },
    },
    categories: {
        default: {
            appenders: ['dateFile', 'out'],
            level: 'debug'
        },
    },
});


// Dev
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
    next();
});

app.use(cookieParser());

app.use(session({
    //参数配置
    secret: 'luckystar', //加密字符串
    name: 'userid', //返回客户端key的名称，默认为connect_sid
    resave: false, //强制保存session，即使它没有变化
    saveUninitialized: true, //强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登录验证，减轻服务器存储压力，权限控制是有帮助的，默认为true
    cookie: {
        maxAge: 6000000
    },
    rolling: true, //在每次请求时进行设置cookie，将重置cookie过期时间
}));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());


// Express Gzip
app.use('/assets', expressStaticGzip(path.resolve(__dirname + '/../build/assets'), {
    index: false,
    customCompressions: [{
        encodingName: 'gzip',
        fileExtension: 'gz'
    }]
}));

// Configure static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../build')));

// Configure controller router
app.use('/book', bookRouter); // Express Middleware
app.use('/user', userRouter);
app.use('/borrow', borrowRouter);
// Send resource
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build', 'index.html'));
});

// App start
const port = process.env.PORT || 3005;
app.listen(port, () => {
    logger.info(`app listening on port: ${port}`);
});