const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConferenceSchema = new  Schema({

    Title:{
        type : String,
        

    },

    description :{

        type: String,
        required :true

    },


    startingDate:{

        type :Date,
        required :true

    },


    
    endDate:{
        type:Date,
        required:true

    },

    approvel:{
        type:String,
        
    },

    Venue:{
        type:String,
        required:true

    },

    changer:{
        type:String,
        required:true

    },

    message:{
        type:String,
        

    },

   

   

})

const conference = mongoose.model("conference",ConferenceSchema);
module.exports =conference;