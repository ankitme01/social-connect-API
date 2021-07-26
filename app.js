import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './router/post.js';
import authRoutes from './router/auth.js';
import userRoutes from './router/user.js';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import fs from 'fs';
import cors from 'cors';
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
app.use(cors());
app.use('/',postRoutes);
app.use('/',authRoutes);
app.use('/',userRoutes);
app.get('/',(req,res)=>{
  fs.readFile("docs/apiDocs.json",(err,data)=>{
   if(err)
   {
     return res.status(400).json({
       error:err
     })
   }
   const docs=JSON.parse(data);
   res.json(docs);
  });
})

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"unauthorised..."});
  }
});

const port=3000;
app.listen(port,()=>{
    console.log(`listening from the port ${port}`);
});