import  mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
});
export default mongoose.model("Post",postSchema);
