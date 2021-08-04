const mongoose = require('mongoose');

const workshopSchema = {
    topic : String,
    description: String,
    date: String,
    time: String,
    organizer: String,
    image: String,
    pdf: String,
    file_path: String,
    file_mimetype: String,
    userID:String,
    state:String
};

const Workshop = mongoose.model("Workshop",workshopSchema);

module.exports = Workshop;