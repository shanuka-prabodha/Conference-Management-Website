const express = require("express");
const mongoose =require("mongoose");
const bodyParser =require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const path = require('path');
const app = express();
dotenv.config();
const PORT=process.env.PORT ||8070

app.use(cors());

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,

})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Mongo DB Connection success");
})

const userRouter = require("./src/routes/User/users");
app.use("/user",userRouter);

const PaymentRouter = require("./src/routes/AtmUser");
app.use("/onlinepay",PaymentRouter);

const PaidRouter = require("./src/routes/paidData");
app.use("/payment",PaidRouter);

const reviewRouter = require("./src/routes/reviewer");
app.use("/review",reviewRouter);


const workshopRouter = require("./src/routes/workshopsRoute");
app.use("/workshops",workshopRouter);

const eventrouter = require("./src/routes/events.js");
const conferencerouter =require("./src/routes/conference.js")

app.use("/mainevent",eventrouter);
app.use("/conference",conferencerouter);

const fileRoute = require("./src/routes/ResearchPaper/file");

app.use(fileRoute);


app.use(express.static(path.join(__dirname, 'client', 'build')));



app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client','build', 'index.html'));
});


app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
});



