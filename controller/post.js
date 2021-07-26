import Post from '../models/post.js';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
export const postById=(req,res,next,id)=>{
  Post.findById(id)
       .populate("postedBy","_id name")
       .exec((err,post)=>{
         if(err||!post)
         {
          return res.status(400).json({
              error:err
          });
         }
         req.post=post;
         next();
       })

}

export const getPost=async(req,res)=>{
    const posts=await Post.find()
    .populate("postedBy","_id name")
    .select("_id title body");
    res.json({
        posts
    })
}

export const createPost=(req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
//next();
}
export const postsByUser=(req,res)=>{
    Post.find({postedBy:req.profile._id})
        .populate("postedBy","_id name")
        .sort("_created")
        .exec((err,posts)=>{
            if(err)
            {
                return res.status(400)/json({
                  error:err
                });
            }
            res.json(posts);
        })
}
export const isPoster=(req,res,next)=>{
    
    let Poster=req.post&&req.auth&&req.post.postedBy._id==req.auth._id;
    if(!Poster)
    {
        return res.status(403).json({
           error:"User is not authorised"
        });
    }
    next();
}
export const deletePost=(req,res)=>{
    let post=req.post;
    post.remove((err,post)=>{
     if(err)
     {
         return res.status(400).json({
             error:err
         });
     }
     res.json({
         message:"Post deleted successfully"
     });
    });
}
export const updatePost=(req,res)=>{
    let post=req.post;
    post=_.extend(post,req.body);
    post.updated=Date.now();
    post.save((err,post)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }
        res.json(post);
    })
}
