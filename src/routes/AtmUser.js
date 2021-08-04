const router = require('express').Router();
let Atm = require('../models/Atm');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');  // NPM package of send sms




//====================Access Sengrid Account Using API Key====================// 
const transporter = nodemailer.createTransport(sendgridTransport({

    auth: {
        api_key: "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"
    }

}))



//====================Add ATM user details to Database by manually (using postman) ====================// 

router.route("/adding").post((req, res) => {
    const type = req.body.type;
    const number = Number(req.body.number);
    const year = Number(req.body.year);
    const date = Number(req.body.date);
    const cvc = Number(req.body.cvc);
    const amount = Number(req.body.amount);



    const newatm = new Atm({
        _id: new mongoose.Types.ObjectId,
        type,
        number,
        year,
        date,
        cvc,
        amount,

    });
    newatm.save().then(() => {      //Save to Database
        res.json("Atm Added");
    }).catch((err) => {
        console.log(err);
    });
})


//====================Check user input of ATM card data , valid or not====================// 
router.route("/card").post(async (req, res) => {

    //Get Data   (client's inputs )
    const type = req.body.type;
    const number = Number(req.body.number);
    const year = Number(req.body.year);
    const date = Number(req.body.date);
    const cvc = Number(req.body.cvc);
    const payable = Number(req.body.payable);

    //find entered data from Databse
    let query = { type: type, number: number, year: year, date: date, cvc: cvc };
    await Atm.find(query).then((atm) => {

        const user = atm[0];   //Get found data into array
        try {

            if (user.number == number && user.type == type && user.cvc == cvc) {  //if all client entered data are correct 

                const a = new Atm();       //create object of ATM schema to find relevent data
                a._id = user._id          //get id from Database
                a.amount = user.amount;   //get id from Database

                if (a.amount >= payable) {  // if ATM balance is sufficent to pay the bill

                    let balance = a.amount - payable  //deduct the payble amount from ATM amount

                    //Update the ATM ballance by id
                    let query2 = { amount: balance };
                    const update = Atm.findByIdAndUpdate(a._id, query2).then(() => {
                        res.json("true");  //send message to client 

                    }).catch((err) => {    // when error occured catch error and send message to frontend 
                        console.log(err);
                        res.status(500).send({ status: "Error with updating data", error: err.message });
                    })

                } else {  // if ATM balance is insufficent to pay the bill
                    res.json("balance insufficient");  //send message to frontend 
                }
            }
        }
        catch (e) {   //when clients inputs were incorrect, catch error and send message to the frontend
            res.json("invalid data");
        }

    }).catch((err) => {
        console.log(err);  //catch the error when retriving input data
    })
})




//====================Send Email====================// 

router.route("/sendmail").post((req, res) => {

    const user = {
        email: req.body.email,        // get user entered email 
        ref: req.body.refId, 
        amount: req.body.payable
    }

    console.log(user.email);

    // Email template
    transporter.sendMail({
        to: user.email,     //Receiver's email
        from: "noreply.dswebsite@gmail.com",    //sender's email
        subject: "This is from Conference Web App",     //subject of the email
        text: "No reply \n" +                  //Body of email
            "Hello " + `${user.email} ` + ",\n" +
            "Your Payment has been received \n" +
            "Paid Amount : " + `${user.amount} ` + " \n" +
            `${user.ref} ` + "\n" +
            "\n"+
           
            "Thank you",

    }, () => {
        res.json("true")   // when email sent successfully ,send message to frontend 
    })
})





module.exports = router;
