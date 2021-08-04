const express = require('express')
let User = require("../models/user");
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const File = require('../models/file');
const { response } = require('./User/users');
const Message = require('../models/message');
let Workshop = require("../models/WorkshopModel");

const app = express()
const saultRounds = 10

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/getResearchPapers', async (req, res) => {
    try {
    
        const files = await File.find({});
      const sortedByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.send(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of files. Try again later.');
    }
  });

  app.get('/getResearchPaper', async (req, res) => {
    console.log(req.query.id)
    await File.find({_id:req.query.id}).populate('users','_id email').then((data)=>{
      res.status(200).send({ data: data });
    }).catch((err)=>{
      console.log(err)
    })



    // try {
    // const file = await File.find({_id:req.query.id}).populate('users','email')
    // console.log(file)
    //   res.send(file);
    // } catch (error) {
    //   res.status(400).send('Error while getting list of files. Try again later.');
    //}
  });

  app.put("/updateResearchpaper", async(req,res)=>{

    console.log("ID ", req.body.id)
    console.log("State ",req.body.state)

    await File.findOneAndUpdate({_id:req.body.id},{state:req.body.state}).then((respond)=>{
        res.send({message:req.body.state})
    }).catch((err)=>{
        console.log(req.body.state," fail")
    })

  })

app.post("/sendmessage", async (req , res)=>{

  const userID = req.body.userID
  const message = req.body.msg
  const State = req.body.state

  const messagee = new Message({

    userID,
    message,
    State
    
}) 

await messagee.save().then((msg)=>{
  res.send(msg)
  console.log(msg)
}).catch(()=>{
  console.log(err)
})
})

app.get("/getmessages", async (req,res)=>{
  try {
    const message = await Message.find({userID:req.query.ID})
    const sortedByCreationDate = message.sort(
      (a, b) => b.createdAt - a.createdAt
    );
      res.send(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of Messages. Try again later.');
    }
})

app.put("/updatemessage", async (req,res)=>{
  await Message.findByIdAndUpdate(req.body.id,{State:req.body.state}).then((respond)=>{
    res.send({message:"message updated"})
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
})

app.get("/getWorkshop",async(req, res)=>{
  Workshop.find({_id:req.query.id}).then((work)=>{
    console.log(work)
    res.send(work)
  }).catch((err)=>{
    res.send(err)
  })
});


app.put("/updateWorkshop", async(req,res)=>{

  console.log("ID ", req.body.id)
  console.log("State ",req.body.state)

  await Workshop.findOneAndUpdate({_id:req.body.id},{state:req.body.state}).then((respond)=>{
      res.send({message:req.body.state})
  }).catch((err)=>{
      console.log(req.body.state," fail")
  })

})


app.get('/getapprovePapers', async (req, res) => {

  try {
  const file = await File.find({state:"Accepted"}).populate("users",'email')
  console.log(file)
    res.send(file);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});



module.exports = app;
