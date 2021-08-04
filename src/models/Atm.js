const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ATMSchema = new Schema({

    _id : mongoose.Schema.Types.ObjectId,
    type : {
        type : String,
        required : true
    },
    number :{
        type : Number,
        required : true
    },
    year :{
        type : Number,
        required : true
    },
    date :{
        type : Number,
        required : true
    },
    cvc :{
        type : Number,
        required : true
    },
    amount :{
        type : Number,
        required : true
    },
    payable :{
        type : Number,
        required : true
    }

})

const Atm = mongoose.model("Atm",ATMSchema);
module.exports = Atm;