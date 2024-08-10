const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

module.exports = mongoose.model('Room', roomSchema);
