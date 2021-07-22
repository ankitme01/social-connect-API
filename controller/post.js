import Post from '../models/post.js';
const getPost=async(req,res)=>{
    const posts=await Post.find().select("_id title body");
    res.json({
        posts
    })
}

const createPost=async(req,res)=>{
 const post= new Post(req.body);
 await post.save();
 res.json({
     post
 })
 
}
export {getPost,createPost};