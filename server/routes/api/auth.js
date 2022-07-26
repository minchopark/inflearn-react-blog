import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth';

import config from '../../config/index';
const { JWT_SECRET } = config

// Model
import User from '../../models/user';
import req from 'express/lib/request';

const router = express.Router()

// @route   POST api/auth
// @desc    Auth    user
// @access  Public 모든사람이 접근가능 (login)
router.post('/', (req, res)=>{

    const {email, password} = req.body;

    // Simple validation
    if(!email || !password) {
        return res.status(400).json({msg: "모든 필드를 채워주세요."})
    }

    // check for existion user
    User.findOne({email}).then((user) => {

        if(!user) return res.status(400).json({msg: "유저가 존재하지 않습니다."})

        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            
            // 일치하지 않는다면
            if(!isMatch) return res.status(400).json({msg: "비밀번호가 일치하지 않습니다."})
            
            jwt.sign(
                {id: user.id}, 
                JWT_SECRET, 
                {expiresIn: "2 days"},

                (err, token) => {
                    if(err) throw err;

                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        }
                    })
                }
                
            )
        })
    })
})

router.get('/user', auth, async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
    
        if(!user) throw Error("유저가 존재하지 않습니다.");

        res.json(user);

    } catch(e) {
        console.log(e)
        res.status(400).json({msg : e.message})
    }
})


// 로그아웃은 프론트에서 Redux-saga 로 처리
router.post('/logout', (req, res) => {
    res.json("로그아웃 성공");
})

export default router;