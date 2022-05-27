import express from 'express';
import mongoose from 'mongoose';
import config from './config';

const app = express();
const {MONGO_URI} = config;


// 몽고db연결
mongoose.connect(MONGO_URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> console.log("MongoDB connectiong Success!!")).catch((e)=> console.log(e));

// 처음에 신호 들어온것을 모두 받아들여라
app.get('/');


// 모듈화 시켜서 다른파일에서 사용할수 있게된다.
export default app;