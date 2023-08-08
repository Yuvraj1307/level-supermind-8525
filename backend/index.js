const express=require("express");
const {seq} =require("./config/db");
require("dotenv").config()

 
const  cors =require("cors");
const { User } = require("./models/usermodel");
const { userRouter } = require("./routs/userRout");
const { Post } = require("./models/postModel");
const { Comment } = require("./models/commentModel");
 
const app = express();
app.use(cors({origin:"*"}))
app.use(express.json())
 


app.get("/",(req,res)=>{
    res.send("welcome to StayHub")
})



app.use("/user",userRouter)
// app.get("/user",async(req,res)=>{
//     let users = await User.findAll();
//     res.status(200).send(users);
//  })


// app.post("/user",async(req,res)=>{
//     let {name,mail}=req.body
//         try {
            
//             let user = User.build({
//                 name,
//                 mail        
//             });
//             await user.save();
//             return res.status(201).send("user registered successfully");
//         } catch (error) {
//             res.send({error})
            
//         }
//  })


app.delete("/post",async(req,res)=>{
     
    await Comment.drop();
    res.send("table is drouped");
 })




seq.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
                console.log(`connected at port ${process.env.PORT}`);
        
    })
})