const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new  Schema({

    event:{
        type : String,
        required:true

    },

    description :{

        type: String,
        required :true

    },


    date:{

        type :Date,
        required :true

    },


    duration:{
        type:Number,
        required:true

    },

    approvel:{
        type:String,
        
    },

    selectedfile:{
        type:String,
        default:null

    },

    Mtype:{
        type:String,
        required:true

    },

    conductor:{
        type:String,
        required:true

    }

})

const events = mongoose.model("MainEvent",EventSchema);
module.exports =events;