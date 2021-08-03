import Post from "../models/post.js";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash";
export const postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err,
        });
      }
      req.post = post;
      next();
    });
};

export const getPost = async (req, res) => {
  const posts = await Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .select("_id title body created likes")
    .sort({created:-1});
  res.json(posts);
};

export const createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
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
          error: err,
        });
      }
      res.json(result);
    });
  });
  //next();
};
export const postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .select("_id title body created likes")
    .sort("_created")
    .exec((err, posts) => {
      if (err) {
        return (
          res.status(400) /
          json({
            error: err,
          })
        );
      }
      res.json(posts);
    });
};
export const isPoster = (req, res, next) => {
  let Poster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!Poster) {
    return res.status(403).json({
      error: "User is not authorised",
    });
  }
  next();
};
export const deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Post deleted successfully",
    });
  });
};
export const updatePost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
      if (err) {
          return res.status(400).json({
            error: "Photo could not be uploaded"
          });
      }
      let post = req.post;
      post = _.extend(post, fields);
      post.updated = Date.now();

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
          res.json(post);
      });
  });
};
export const photo = (req, res) => {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
};
export const SinglePost=(req,res)=>{
  return res.json(req.post);
}

export const like = (req, res) => {
  Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.body.userId } },
      { new: true }
  ).exec((err, result) => {
      if (err) {
          return res.status(400).json({
              error: err
          });
      } else {
          res.json(result);
      }
  });
};

export const unlike = (req, res) => {
  Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes:{$in: [req.body.userId]} } },
      { new: true }
  ).exec((err, result) => {
      if (err) {
          return res.status(400).json({
              error: err
          });
      } else {
          res.json(result);
      }
  });
};

export const comment = (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;

  Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
  )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: err
              });
          } else {
              res.json(result);
          }
      });
};


export const uncomment = (req, res) => {
let comment = req.body.comment;

Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: { _id: comment._id} } },
    { new: true }
)
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);
        }
    });
};