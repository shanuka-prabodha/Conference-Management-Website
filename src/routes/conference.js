const router =require("express").Router();
let Conference =require("../models/conference");

router.route("/add").post((req,res)=>{

    const Title = req.body.Title;
    const description =req.body.description;
    const startingDate = Date(req.body.startingDate);
    const endDate = Date(req.body.endDate);
    const approvel = req.body.approvel;
    const Venue = req.body.Venue;
    const changer = req.body.changer;
    const message = req.body.message


    const newEvent = new Conference({
        Title,
        description,
        startingDate,
        endDate,
        approvel,
        Venue,
        changer,
        message


    })

    newEvent.save().then(()=>{
        res.json("New main conference Added");
    }).catch((err)=>{
        console.log(err);
    })
})




router.route("/readEditor").get((req,res)=>{
    Conference.find({changer:'editor'}).then((conference)=>{
        res.json(conference)
        
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/Editorupdate/:id").patch(async(req,res)=>{

    let conferenceID = req.params.id;
    const{Title,description,startingDate,endDate,approvel,Venue,changer,message} = req.body; //di structure method

    console.log(conferenceID)

    const updateconference = {
        
        Title,
        description,
        startingDate,
        endDate,
        approvel:'no',
        Venue,
        changer:'editor',
        message
        

    }

    const update = await Conference.findByIdAndUpdate(conferenceID,updateconference,{new:true}).then(()=>{

        res.status(200).send({status:"conference updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with event updating process"});
    })


})

router.route("/readapproved").get((req,res)=>{
    Conference.find({changer:'admin'}).then((conference)=>{
        res.json(conference)
        
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/adminupdate/:id").patch(async(req,res)=>{

    let conferenceID = req.params.id;
    const{Title,description,startingDate,endDate,approvel,Venue,changer,message} = req.body; //di structure method

    const updateconference = {
        
        Title,
        description,
        startingDate,
        endDate,
        approvel,
        Venue,
        changer:'admin',
        message
        

    }

    const update = await Conference.findByIdAndUpdate(conferenceID,updateconference,{new:true}).then(()=>{

        res.status(200).send({status:"conference updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with event updating process"});
    })


})



router.route("/readadmin").get((req,res)=>{
    Conference.find({changer:'editor',approvel:'no'}).then((conference)=>{
        res.json(conference)
        
    }).catch((err)=>{
        console.log(err)
    })
})



router.route("/conferenceDecline/:id").patch(async(req,res)=>{

    let conferenceID = req.params.id;
    const{Title,description,startingDate,endDate,approvel,Venue,changer,message} = req.body; //di structure method

    console.log(conferenceID)

    const updateconference = {
        
        Title,
        description,
        startingDate,
        endDate,
        approvel:'declined',
        Venue,
        changer:'editor',
        message
        

    }

    const update = await Conference.findByIdAndUpdate(conferenceID,updateconference,{new:true}).then(()=>{

        res.status(200).send({status:"conference updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with event updating process"});
    })


})



router.route("/conferenceApprove/:id").patch(async(req,res)=>{

    let conferenceID = req.params.id;
    const{Title,description,startingDate,endDate,approvel,Venue,changer,message} = req.body; //di structure method

    console.log(conferenceID)

    const updateconference = {
        
        Title,
        description,
        startingDate,
        endDate,
        approvel:'Approved',
        Venue,
        changer:'editor',
        message
        

    }

    const update = await Conference.findByIdAndUpdate(conferenceID,updateconference,{new:true}).then(()=>{

        res.status(200).send({status:"conference updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with event updating process"});
    })


})












module.exports=router;

 
