import express, { application } from 'express';
import {getPost,createPost} from '../controller/post.js';
import {requireSignin} from '../controller/auth.js';
import {createPostValidator} from '../validation/index.js';
import { userByID } from '../controller/user.js';
const router=express.Router();

router.get('/',getPost);
router.post('/post',requireSignin,createPostValidator,createPost);
router.param('userId',userByID);
export default router;