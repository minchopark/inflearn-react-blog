import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";


// Routes
import postRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';


const app = express();
const {MONGO_URI} = config;

// 서버 보안을 보완해주는 라이브러리
app.use(hpp())
app.use(helmet())

// origin 허락하고자하는 주소를적는곳, true = 모든 주소
app.use(cors({origin: true, credentials: true}))
// 로그를 확인
app.use(morgan("dev"))

// 브라우저에서 내용을 보내면 서버에서는 json형태로 해석해주세요
app.use(express.json())


// 몽고db연결
mongoose.connect(MONGO_URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> console.log("MongoDB connectiong Success!!")).catch((e)=> console.log(e));


// 처음에 신호 들어온것을 모두 받아들여라
// Use routes
app.get('/');
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


// 모듈화 시켜서 다른파일에서 사용할수 있게된다.
export default app;

