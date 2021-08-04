const mongoose = require('mongoose');

const workshopFileSchema = mongoose.Schema(
  {
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const WorkshopFile = mongoose.model('WorkshopFile', workshopFileSchema);

module.exports = WorkshopFile;