import  mongoose from "mongoose";
const {ObjectId}=mongoose.Schema;
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    created:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:ObjectId,
        ref:'User'
    },
    updated: Date,
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: ObjectId, ref: "User" }
        }
    ]
});
export default mongoose.model("Post",postSchema);
