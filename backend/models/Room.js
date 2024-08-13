const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  files: [
    {
      filename: String,
      url: String,
      cloudinary_id: String
    }
  ]
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
