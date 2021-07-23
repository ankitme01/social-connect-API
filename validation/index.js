const createPostValidator=(req,res,next)=>{
   req.check("title","write a title").notEmpty();
   req.check("title","title must be between 4 to 150 characters").isLength({
       min:4,
       max:150
   });
   req.check("body","write a body").notEmpty();
   req.check("body","body must be between 4 to 2000 characters").isLength({
       min:4,
       max:2000
   });
   const errors=req.validationErrors();
   if(errors)
   {
       const firstError=errors.map(error=>error.msg)[0];
       return res.json({error:firstError});
   }
   next();
}
const userSignupValidator=(req,res,next)=>{
   req.check("name","name is required").notEmpty();
   req.check("email","Email must be between 3 to 32 characters")
     .matches(/.+\@.+\..+/)
      .withMessage("please enter a valid email")
      .isLength({
          min:4,
          max:2000
      });
    req.check("password","Password is required").notEmpty();
    req.check("password")
    .isLength({min:6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
    const errors=req.validationErrors();
    if(errors)
    {
        const firstError=errors.map(error=>error.msg)[0];
        return res.json({error:firstError});
    }
    next();  
}
export {createPostValidator,userSignupValidator};