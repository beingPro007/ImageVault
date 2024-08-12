const Room = require('../models/Room.js');

const createRoom = async (req, res) => {
    const roomId = Math.random().toString(36).substring(2, 9);
    try {
        const room = new Room({ roomId });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create room' });
    }
};

const findRoom = async (req, res) => {
    console.log("Fetching room with ID:", req.params.roomId);
    try {
        const room = await Room.findOne({ roomId: req.params.roomId }).populate('files');
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error('Failed to retrieve room:', error);
        res.status(500).json({ error: 'Failed to retrieve room' });
    }
};

const getFilesByRoomId = async (req, res) => {
    console.log("hiiiiiii");
    
    try {
        const { roomId } = req.params;
        console.log("Fetching files for Room ID:", roomId);
        const room = await Room.findOne({ roomId }).populate('files');
        if (!room) {
            console.log("Room not found for ID:", roomId);
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room.files);
    } catch (error) {
        console.log("Server error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createRoom,
    findRoom,
    getFilesByRoomId
};