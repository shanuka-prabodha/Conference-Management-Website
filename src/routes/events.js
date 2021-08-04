const router =require("express").Router();
let Event = require("../models/mainEvents");

//insert route code
router.route("/add").post((req,res)=>{

    const event = req.body.event;
    const description =req.body.description;
    const date = Date(req.body.date);
    const duration = Number(req.body.duration);
    const approvel = req.body.approvel;
    const selectedfile = req.body.selectedfile;
    const Mtype = req.body.Mtype;
    const conductor = req.body.conductor


    const newEvent = new Event({
        event,
        description,
        date,
        duration,
        approvel,
        selectedfile,
        Mtype,
        conductor


    })

    newEvent.save().then(()=>{
        res.json("New main event Added");
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/readAll").get((req,res)=>{

    Event.find().then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/update/:id").patch(async(req,res)=>{

    let eventID = req.params.id;
    const{event,description,date,duration,approvel,Mtype,conductor} = req.body; //di structure method

    const updateEvent = {
        
        event,
        description,
        date,
        duration,
        approvel:"no",
        Mtype,
        conductor
        
        

    }

    const update = await Event.findByIdAndUpdate(eventID,updateEvent,{new:true}).then(()=>{

        res.status(200).send({status:"Event updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with event updating process"});
    })


})

router.route("/delete/:id").delete(async(req,res)=>{
    let eventID = req.params.id;

    await Event.findByIdAndDelete(eventID).then(()=>{
        res.status(200).send({status:"event deleted"});

    }).catch((err)=>{
        res.status(500).send({status:"error with event deleting process "})
    })
})



router.route("/readNo").get((req,res)=>{

    Event.find({approvel:'no'}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/approve/:id").patch(async(req,res)=>{

    let eventID = req.params.id;
    console.log(eventID);
    const{event,description,date,duration,approvel,Mtype,conductor} = req.body; //di structure method

    const updateEvent = {
        
        event,
        description,
        date,
        duration,
        approvel:"approve",
        Mtype,
        conductor
        
        

    }

    const update = await Event.findByIdAndUpdate(eventID,updateEvent,{new:true}).then(()=>{

        res.status(200).send({status:"Event updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with event updating process"});
    })


})

router.route("/decline/:id").patch(async(req,res)=>{

    let eventID = req.params.id;
    console.log(eventID);
    const{event,description,date,duration,approvel,Mtype,conductor} = req.body; //di structure method

    const updateEvent = {
        
        event,
        description,
        date,
        duration,
        approvel:"decline",
        Mtype,
        conductor
        
        

    }

    const update = await Event.findByIdAndUpdate(eventID,updateEvent,{new:true}).then(()=>{

        res.status(200).send({status:"Event updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with event updating process"});
    })


})


router.route("/readApproved").get((req,res)=>{

    Event.find({approvel:'approve'}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/readDecline").get((req,res)=>{

    Event.find({approvel:'decline'}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})



router.route("/readworkshopsEvents").get((req,res)=>{

    Event.find({Mtype:'workshop',approvel:'approve'}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/readresearchEvents").get((req,res)=>{

    Event.find({Mtype:'research',approvel:'approve'}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})
















module.exports=router;


