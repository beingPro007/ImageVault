const cloudinary = require('../config/cloudinaryConfig');
const Room = require('../models/Room');

const uploadFile = async (req, res) => {
  const { roomId } = req.params;
  console.log("1");


  try {
    console.log("2");

    // Check if the room exists
    const room = await Room.findOne({ roomId });
    console.log("2.5");
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    console.log("3");

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log("4");


    const uploadResponse = await cloudinary.uploader.upload_stream(
      {
        folder: roomId,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
        }
        console.log("5");


        const newFile = {
          filename: result.original_filename,
          url: result.secure_url,
          cloudinary_id: result.public_id,
        };
        console.log("6");


        room.files.push(newFile);
        console.log("7");

        room.save();
        console.log("8");


        res.status(200).json(newFile);
      }
    ).end(file.buffer);
  } catch (error) {
    console.log("9");

    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

module.exports = { uploadFile };
