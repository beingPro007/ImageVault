const express = require('express');
const router = express.Router();
const Room = require('../models/Room.js');

router.post('/create', async (req, res) => {
  const { roomId } = req.body;

  try {
    const room = new Room({ roomId });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
});

router.get('/:roomId', async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId }).populate('files');
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve room' });
  }
});

module.exports = router;
