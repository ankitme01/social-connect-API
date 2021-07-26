import express, { application } from 'express';
import {getPost,createPost,postsByUser,postById,isPoster,deletePost, updatePost} from '../controller/post.js';
import {requireSignin} from '../controller/auth.js';
import {createPostValidator} from '../validation/index.js';
import { userByID } from '../controller/user.js';
const router=express.Router();

router.get('/posts',getPost);
router.post('/post/new/:userId',requireSignin,createPost,createPostValidator);
router.get('/posts/by/:userId',requireSignin,postsByUser);
router.delete('/post/:postId',requireSignin,isPoster,deletePost);
router.put('/post/:postId',requireSignin,isPoster,updatePost);
router.param('userId',userByID);
router.param('postId',postById);

export default router;