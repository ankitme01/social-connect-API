import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './router/post.js';
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
app.use(expressValidator());
app.use('/',router);
const port=3000;
app.listen(port,()=>{
    console.log(`listening from the port ${port}`);
});