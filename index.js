const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user') // 생략하면 index.js 를 가져옴

// NODE_ENV (package.json에서 설정 함) 가 test 일 경우에는 테스트용이 아닌 log 는 찍지 않음. 
if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
 }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user); // users 하위로 들어오는 요청은 user에서 담당

module.exports = app;
