import express from 'express';

const app = express();

// 처음에 신호 들어온것을 모두 받아들여라
app.get('/');

// 모듈화 시켜서 다른파일에서 사용할수 있게된다.
export default app;