const express = require('express')
let Paid = require('../models/paid');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const Router = express.Router();



Router.post('/paid', async (req, res) => {
  console.log(req.query.ID)

  const { users, amount, type, reference } = req.body;

  const PaidDate = new Date().toLocaleDateString()
  const paid = new Paid({
    users,
    amount,
    type,
    PaidDate,
    reference
  });

  paid.save().then(() => {
    res.json("true")
  }).catch((err) => {
    console.log(err.message);
    res.json(err)
  })
});


Router.get("/getparticipents" , async (req, res) => {
 
   await Paid.find({type:'ticket'}) 
   .populate('users', 'username email')
   .then((data) => {
    res.status(200).send({data: data });
  })
  .catch((err) => {
    console.log(err.message);
    res.status(500).send({ status: "Error with getting user", error: err.message });
  })
})

Router.get("/allpayments" , async (req, res) => {
 
  await Paid.find({type:'paper'})
  .populate('users', 'username email')
  .then((data) => {
   res.status(200).send({ data: data });
 }).catch((err) => {
   console.log(err.message);
   res.status(500).send({error:error.message})
 })
})



module.exports = Router;
