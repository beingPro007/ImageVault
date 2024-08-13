const cloudinary = require('../config/cloudinaryConfig');
const Room = require('../models/Room');
const Filee = require('../models/File');

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

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: roomId,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log("5");
            resolve(result);
          }
        }
      ).end(file.buffer);
    });

    const newFileData = {
      filename: file.originalname.split('.')[0],
      url: uploadResponse.secure_url,
      cloudinary_id: uploadResponse.public_id,
      roomId: room._id,
    };
    console.log("6");
    
    const newFile = new Filee(newFileData);
    await newFile.save();

    room.files.push(newFile._id);
    await room.save();
    console.log("7");

    res.status(200).json(newFile);
  } catch (error) {
    console.log("8");
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

module.exports = { uploadFile };
