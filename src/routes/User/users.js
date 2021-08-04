const express = require('express')
let User = require("../../models/user");
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken')

const app = express()
const saultRounds = 10

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/register", (req,res) =>{
    const username = req.body.username
    const email = req.body.email
    const usertype = req.body.usertype
  
    if(req.body.username == ""){
      res.send({Error:"username empty"})
    }
    if(req.body.email == ""){
      res.send({Error:"email empty"})
    }
    if(req.body.password == ""){
      res.send({Error:"password empty"})
    }else{

    bcrypt.hash(req.body.password ,saultRounds , (err,hash) =>{

      const password = hash

      const newUser = new User({
        username,
        email,
        password,    
        usertype
    })   

    User.findOne({ email: req.body.email }).then((user) =>{
      if(user){
        res.send({Error: "Email aready in use"})
      }else{
        newUser.save().then((user)=>{
          console.log(user)
          res.send({message: "Registration Success"})
      }).catch((err) =>{
          res.send({Error:"user details missing"})
      })}
    }).catch()  
    })
  }
})



app.get("/post",verifyToken,(req, res) =>{
 
  if(req.user){
    res.json(req.user)
  }else{
    res.send({message:"Token not valid"})
  }
})

app.post("/login", async(req,res) =>{

  await User.findOne({ email: req.body.email }).then( //find corresponding email form users list 
      (user) => {
       //since the password in database is in encrypted format we have to get it and decrypt to compre with user entered password
       //That's what we are doing here with bcrypt.compare method 
       bcrypt.compare(req.body.password, user.password , (err , result) =>{ // compare passwords
        if(err || !result){
          res.send({message:"Password not valid"})
        }else{
          jwt.sign({user} , 'secretkey', (err, token) =>{
            res.json({token , usertype: user.usertype})
          }) 
        }})
      }).catch(
      (error) => {
        res.send({message: "Invalid Email"})
      }
    );
  })
  
  
app.put("/update" , (req , res)=>{

  User.findByIdAndUpdate({_id : req.body.id},
    {
    username: req.body.Username,
    email: req.body.Email,
    usertype: req.body.Usertype
  }).then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })


})

//verify token
function verifyToken(req , res , next){
//Get auth header value
const bearerHeader = req.headers['authorization'];
const token = bearerHeader && bearerHeader.split(' ')[1]
//checking if there is a token or not
if(token == null){
  return res.sendStatus(401)
}else{
  jwt.verify(token, 'secretkey', (err, authData)=>{
    if(err){
      res.sendStatus(403)
    }else{
      req.user = authData
      next()
    }
  })
}
}


module.exports = app;
