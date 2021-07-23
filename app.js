import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './router/post.js';
import authRoutes from './router/auth.js';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
dotenv.config();
const app=express();

 mongoose.connect(process.env.dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function () {
   console.log("connected to MongoDB");
 });
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser());
app.use(expressValidator());
app.use('/',postRoutes);
app.use('/',authRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"unauthorised..."});
  }
});

const port=3000;
app.listen(port,()=>{
    console.log(`listening from the port ${port}`);
});