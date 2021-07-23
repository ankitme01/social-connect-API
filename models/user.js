import mongoose from 'mongoose';
import crypto from 'crypto';
import {v1 as uudiv1} from 'uuid'; 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt: String,
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date
});

userSchema
      .virtual("password")
      .set(function(password){
           this._password=password;
           this.salt=uudiv1();
           this.hashed_password=this.encryptPassword(password);
        })
        .get(function(){
            return this._password;
        })
userSchema.methods={
    authenticate:function(plainText)
    {
    return this.encryptPassword(plainText)===this.hashed_password; 
    },
    encryptPassword:function(password){
          if(!password)
          return "";
          try{
              return crypto 
              .createHmac('sha1',this.salt)
              .update(password)
              .digest('hex');
          }
          catch(err){
                   return "";
          }
      }
   };    

export default mongoose.model("User",userSchema);