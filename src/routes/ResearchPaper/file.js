const path = require('path');
const express = require('express');
const File = require('../../models/file');
const  MulterGoogleCloudStorage = require('multer-google-storage');
const  multer = require('multer');
const Router = express.Router();

const uploadHandler = multer({
    storage: MulterGoogleCloudStorage.storageEngine({
    autoRetry:true,
    bucket:"researchupload",
    projectId: "conference-316016",
    keyFilename:"./conference-316016-451340383f6e.json",
    filename:(req,file,cb)=>{
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }

  })
})

Router.post('/upload',
  uploadHandler.single('file'),
   (req, res) => {
   
      console.log(req.files)

      const { title, description,userId,state,paid,originalName } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
        originalName,
        state,
        paid,
        users:userId
      });

      console.log(file)

       file.save().then(()=>{
        res.send('file uploaded successfully.');
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with uploading data",error:err.message});
    })
  
  
  });

Router.get('/getAllFiles', async (req, res) => {
  console.log(req.query.ID)

  try {
    const files = await File.find({users:req.query.ID});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
    //console.log(files);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});



Router.get('/getAll', async (req, res) => {
  console.log(req.query.ID)

  try {
    const files = await File.find({state:"Accepted"});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
    //console.log(files);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});


Router.get('/download/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
console.log(file.file_path);
    res.sendFile(file.file_path);
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

Router.delete("/delete/:id" ,async (req,res)=>{
  let userId = req.params.id;

  await File.deleteOne({_id:userId}).then(()=>{
      res.status(200).send({status: "User deleted"});
  }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status:"Error with deleting data",error:err.message});
  })
})




Router.put('/updatepaper',
  uploadHandler.single('file'),
   (req, res) => {
    
      let Id = req.params.id;

      console.log(Id)

      const { id,title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });

      console.log(file)

      File.findByIdAndUpdate({_id : id},
        {
        title: title,
        description: description,
        file_path: path,
        file_mimetype: mimetype

      }).then((respond)=>{
        res.send('file updated successfully.');
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
    
    })



    Router.put("/paidupdate", async(req,res)=>{

      console.log("ID ", req.body.id)
      console.log("State ",req.body.paid)
  
      await File.findOneAndUpdate({_id:req.body.id},{
        paid:req.body.paid
      
      
      }).then((respond)=>{
          res.send({message:req.body.paid})
      }).catch((err)=>{
          console.log(req.body.paid," fail")
      })
  
    })



module.exports = Router;