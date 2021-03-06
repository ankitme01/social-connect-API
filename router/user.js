import express from 'express';
import { userByID, allUsers,getUser,updateUser,deleteUser,userPhoto,addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,findPeople } from '../controller/user.js';
import {requireSignin} from '../controller/auth.js';

const router=express.Router();
router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);
router.get('/users',allUsers);
router.get('/user/:userId',requireSignin,getUser);
router.put('/user/:userId',requireSignin,updateUser);
router.delete('/user/:userId',requireSignin,deleteUser);
router.get('/user/photo/:userId',userPhoto);
router.get("/user/findpeople/:userId", requireSignin, findPeople);
router.param('userId',userByID);
export default router;