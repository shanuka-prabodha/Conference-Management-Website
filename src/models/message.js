const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
    userID : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    State : {
        type : String,
        required : true
    },
    },{
    timestamps: true
})


//table name = user
const Message = mongoose.model("message",messageSchema)

module.exports = Message