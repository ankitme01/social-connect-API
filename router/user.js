import express from 'express';
import { userByID, allUsers,getUser,updateUser,deleteUser } from '../controller/user.js';
import {requireSignin} from '../controller/auth.js';
const router=express.Router();

router.get('/users',allUsers);
router.get('/user/:userId',requireSignin,getUser);
router.put('/user/:userId',requireSignin,updateUser);
router.delete('/user/:userId',requireSignin,deleteUser);
router.param('userId',userByID);
export default router;