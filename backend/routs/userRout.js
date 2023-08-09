const { auth } = require("../midlewares/authentication");
const { Comment } = require("../models/commentModel");
const { Post } = require("../models/postModel");
const { User } = require("../models/usermodel")
const jwt=require("jsonwebtoken");

require("dotenv").config()

const userRouter=require("express").Router()

// <<<<<<<<<<-----------to get all users------------>>>>>>>>>>>>>>>
userRouter.get("/",auth, async(req,res)=>{
    try {
        let users=await User.findAll()
        res.send(users)
        
    } catch (error) {
        res.send({error})
    }
})

//<<<<<<<<<<<<<-----------to register user------------>>>>>>>>>>>>>
userRouter.post("/register",async(req,res)=>{
    const { name, email, password } = req.body  ;
    console.log(name, email, password )
    try {
      let data = await User.findOne({ where: { email } });
  
      if (data) {
        return res
          .status(200)
          .send({ msg: "user already registered please login" });
      }
  
      
           let user = User.build({
            name,
            email,
             password,
          });
          await user.save();
          return res.status(201).send("user registered successfully");
        
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: error.message });
    }
})


//<<<<<<<<<<<<<<<<-------------to login user------------->>>>>>>>>>>>>>>>>
userRouter.post("/login", async (req, res) => {
     
  
    let { email, password } = req.body;
  
    try {
      let user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({ msg: "user not found" });
      }
  
      // remember to check for id
      if(user.password===password){

          var token = jwt.sign(
            {userID:user.dataValues.id, email: user.dataValues.email },
           "secret",
            { expiresIn: "2h" }
          );
          console.log(token);
          res
            .status(201)
            .send({ msg: "logi success", token, name: user.dataValues.name });
      
        } else {
          console.log(err);
          res.status(404).send({ mag: "Incorrect pasword" });
        }
     } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: error.message });
    }
  });




//<<<<<<<<<<<<<<-------------to get all posts------------>>>>>>>>>>>>>>>>
userRouter.get("/allpost",async(req,res)=>{
  let posts=await Post.findAll()
  res.send(posts)
})

//<<<<<<<<<<<<<---------------to create post--------------->>>>>>>>>>>>>>>>
  userRouter.post("/post",auth,async(req,res)=>{
    let {title,content,url,userID}=req.body
   try {
       let post = Post.build({title,content,url,userId:userID});
       await post.save();
       res.send(post)
       
    } catch (error) {
        res.send({error})
    }
  })


//<<<<<<<<<<<<<<<<--------------to get all user related posts------------------>>>>>>>>>>>>>>>
  userRouter.get("/post",auth,async(req,res)=>{
    let userId=req.body.userID
    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Post,
                include: Comment,
            },
          });
        res.send(user)
       
    } catch (error) {
        console.log(error)
        res.send({error:error.message})
    }
  })
  

//<<<<<<<<<<<<<<<<<<<----------to update related post--------------->>>>>>>>>>>>>>>>>
userRouter.patch("/post",auth,async(req,res)=>{
    let {userID,postID,title,content,url}=req.body
     try {
        

          let post = await Post.update({title,content,url}, {
            where: { id: postID,userId:userID },
          });
        res.send({msg:"post is updated"})
       
    } catch (error) {
        console.log(error)
        res.send({error:error.message})
    }
  })



//<<<<<<<<<<<<<------------to delete related post---------------->>>>>>>>>>>>>
userRouter.patch("/post/:postID",auth,async(req,res)=>{
    let {userID}=req.body
    let postID=req.params.postID
     try {
        
        let post = await Host.destroy({
            where: {id: postID,userId:userID },
          });
           
        res.send({msg:"post is deleted"})
       
    } catch (error) {
        console.log(error)
        res.send({error:error.message})
    }
  })


//<<<<<<<<<<<<<<<---------------to create comment----------------->>>>>>>>>>>>>>>>>>>>>>
  userRouter.post("/comment",auth,async(req,res)=>{
    let {content,postID,userID}=req.body
    try {
        let comment = Comment.build({content,userId:userID,postId:postID});
        await comment.save();
        res.send(comment)
        
     } catch (error) {
         res.send({error})
     }
  })



  //<<<<<<<<<<<<<<<<<<<------------to get user secific comment--------------->>>>>>>>>>>>>>>>
  userRouter.get("/comment",auth,async(req,res)=>{
    let userId=req.body.userID

    try {
        const comments = await User.findByPk(userId, {
            include: 'comments',
          });
        res.send(comments)
        
     } catch (error) {
         res.send({error})
     }
  })

  //<<<<<<<<<<<<---------------to update user specific comment------------------>>>>>>>>>>>>>>
  userRouter.patch("/comment/:commentID",auth,async(req,res)=>{
    let {userID,postID,content}=req.body
    let commentID=req.params.commentID
     try {
        

          let post = await Comment.update({content}, {
            where: {id:commentID, postId: postID,userId:userID },
          });
        res.send({msg:"comment is updated"})
       
    } catch (error) {
        console.log(error)
        res.send({error:error.message})
    }
  })


  //<<<<<<<<<<<<<<<---------------to delete a user specific comment------------------>>>>>>>>>>>>>>>>
  userRouter.delete("/comment/:commentID",auth,async(req,res)=>{
    let {userID,postID}=req.body
    let commentID=req.params.commentID
     try {
        

          let post = await Comment.destroy({
            where: {id:commentID, postId: postID,userId:userID },
          });
        res.send({msg:"comment is deleted"})
       
    } catch (error) {
        console.log(error)
        res.send({error:error.message})
    }
  })
module.exports={userRouter}
