import express from "express";
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import config from '../../config/index';
const { JWT_SECRET } = config;


// Model
import User from '../../models/user';

const router = express.Router()

// @routes  GET api/user
// @desc    GET all user
// @access  public

router.get('/', async(req, res) => {
    
    try {

        const users = await User.find()
        // 유저 찾기 실패
        if(!users) throw Error("No users");
        // 유저 찾음
        res.status(200).json(users)

    } catch(e) {

        console.log(e)
        res.status(400).json({msg: e.message})
    
    }
});


// @routes  POST api/user
// @desc    Register user
// @access  public 모든사람이 접근가능
// 회원가입
router.post('/', (req, res) => {

    console.log(req)
    const {name, email, password} = req.body
    

    // simple validation
    if( !name || !email || !password) {
        return res.status(400).json({msg: "모든 필드를 채워주세요."})
    }

    // check for exising user
    User.findOne({email}).then((user => {

        // user가 이미 있는경우
        if(user) return res.status(400).json({msg: "이미 가입된 유저가 존재합니다."})

        const newUser = new User({
            name, email, password
        });

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(newUser.password, salt, (err, hash) => {

                if(err) throw err;
                
                // newUser의 패스워드를 해시값으로
                newUser.password = hash;

                // 저장
                newUser.save().then((user) => {

                    // 만들어진 유저를 웹 토큰에 등록
                    // expiresIn : 만기일
                    jwt.sign(
                        {id: user.id},
                        JWT_SECRET,
                        {expiresIn: 3600},

                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )

                })
            })
        })

        
    }))

});

export default router;