import User from '../models/user.js';

const userByID=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
       if(err||!user)
       {
           return res.status(400).json({
               error:"User not found"
           })
       }
       req.profile=user;
    })
    next();
}
const hasAuthorization=(req,res,next)=>{
    const authorized=req.profile&&req.auth&&req.auth._id===req.profile._id;
}
export {userByID};