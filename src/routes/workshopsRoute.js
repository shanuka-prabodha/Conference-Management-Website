const path = require('path');
const express = require('express');
let Workshop = require("../models/WorkshopModel");
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



Router.post('/add',
uploadHandler.single('pdf'),(req, res)=>{
    let newWorkshop = new Workshop({
        topic: req.body.topic,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image,
        pdf: req.body.pdf,
        userID : req.body.userID,
        state: req.body.state
    });

    newWorkshop.save(function (err){
        if(!err){
            return res.json();
        }
    });

    console.log(req.body);
});




Router.put('/uploadFile/:id',uploadHandler.single('pdf'),(req,res)=>{
    console.log(req.file.filename);
    Workshop.findByIdAndUpdate(
        req.params.id,
        {
            pdf: req.file.filename,
            file_path: req.file.path,
            file_mimetype: req.file.mimetype
        },
        (err, post)=>{
            if(err){
                return res.json(err);
            }
            return res.json({
                success: "Successfully Updated."
            });
        }
    )
});

Router.route("/download/:id").get(async(req,res)=>{
    try {
    const file = await Workshop.findById(req.params.id);
    res.set({
    'Content-Type': file.file_mimetype
    });
    console.log(file.file_path)
     res.json(file.file_path)
   // res.sendFile(file.file_path);
    } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
    }
    

    })

    Router.get("/",(req, res)=>{
    Workshop.find().exec((err, workshops)=>{
        if(!err){
            return res.json(workshops);
        }
    });
});

/*
Router.get("/byUser/:id",(req, res)=>{
    console.log(req.params.id);
    if (req.params && req.params.id) {
    Workshop.find({
        userID: req.params.id,
      }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
    }
});
*/


Router.get("/accepted",(req, res)=>{
    Workshop.find({
        state: "Accepted",
      }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
});

Router.get("/lastItem",(req, res)=>{
    Workshop.find().sort( [['_id', -1]] ).limit(1).exec((err, workshops)=>{
        if(!err){
            return res.json(workshops);
        }
    });
});

Router.put('/change/:id',(req,res)=>{
    Workshop.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (err, post)=>{
            if(err){
                return res.json(err);
            }
            return res.json({
                success: "Successfully Updated."
            });
        }
    )
});

Router.delete('/remove/:id',(req, res)=>{
    Workshop.findByIdAndRemove(req.params.id).exec((err,deletePost)=>{
        if(err){
            return res.json(err);
        }
        res.json({
            message:"Successfully deleted.",
            deletePost
        })
    })
});

Router.get("/:id",(req, res)=>{
    Workshop.findById(req.params.id).exec((err, workshops)=>{
        if(!err){
            return res.json(workshops);
        }
    });
});

module.exports = Router;
