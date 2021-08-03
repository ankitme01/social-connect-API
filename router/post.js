import express from "express";
import {
  getPost,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  photo,
  SinglePost,
  like,
  unlike,
  comment,
  uncomment
} from "../controller/post.js";
import { requireSignin } from "../controller/auth.js";
import { createPostValidator } from "../validation/index.js";
import { userByID } from "../controller/user.js";

const router = express.Router();
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);
router.get("/posts", getPost);
router.get("/post/:postId", SinglePost);
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.param("userId", userByID);
router.param("postId", postById);
router.get("/post/photo/:postId", photo);
export default router;
