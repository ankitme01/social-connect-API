import express from 'express';
import {getPost,createPost} from '../controller/post.js';
import {createPostValidator} from '../validation/index.js';
const router=express.Router();

router.get('/',getPost);
router.post('/',createPostValidator,createPost);
export default router;