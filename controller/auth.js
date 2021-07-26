import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import expressJwt from 'express-jwt';
dotenv.config();
export const signup=async(req,res)=>{
  const userExits=await User.findOne({email:req.body.email});
  if(userExits)
  {
      return res.status(403).json({
          error:"Email is Taken!"
      });
  }
  const user =new User(req.body);
  await user.save();
  res.json({message:"signup success! please login."});
}
export const signin=(req,res)=>{
  const {email,password}=req.body;
   User.findOne({email},(err,user)=>{
     if(err||!user)
     {
       return res.status(401).json({
         error:"The email address or password is incorrect. Please retry..."
       });
     }
     if(!user.authenticate(password))
     {
       return res.status(401).json({
         error:"The email address or password is incorrect. Please retry..."
       });
     }
     const token=jwt.sign({_id:user._id},process.env.JWT_SECRET); 
     res.cookie("t",token,{expire:new Date()+9999});
     const {_id,name,email}=user;
     return res.json({token,user:{_id,name,email}});
   });
};
export const signout=(req,res)=>{
  res.clearCookie("t");
  return res.json({message:"signout success!"});
}
export const requireSignin=expressJwt({
  secret:process.env.JWT_SECRET,
  algorithms:["HS256"],
  userProperty:"auth",
});
