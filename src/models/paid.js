const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pay = new Schema({


    users :{
        type :  mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'users'
    },
    amount :{
        type : Number,
        required : true
        
    },
    type :{
        type : String,
        required : true
    },
    PaidDate :{
        type : String,
        required : true
    },
    reference :{
        type : String,
        required : false
    }

})

const mypayment = mongoose.model("paid",pay);
module.exports = mypayment;

