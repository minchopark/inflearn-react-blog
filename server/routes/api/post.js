import express from 'express';
import auth from '../../middleware/auth';

// Model
import Post from '../../models/post';

const router = express.Router()

// api/post
router.get('/', async(req, res)=> {

    const postFindResult = await Post.find()        // 모든 post 찾을때까지 기다려라
    console.log(postFindResult, "All Post Get.")
    res.json(postFindResult)

})


router.post('/', auth ,async(req, res, next) => {

    // error가 발생할 수 있기 때문에
    try{
        console.log(req, "req")
        const {title, contents, fileUrl, creator} = req.body
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator,
        })
        res.json(newPost)
    }catch(e){
        console.log(e)
    }
})

export default router;