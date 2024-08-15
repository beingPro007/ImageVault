const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controller/fileController.js');

const router = express.Router();

// Set up multer to use memory storage
const storage = multer.memoryStorage();

const upload = multer({ storage });

// POST /upload/:roomId
router.post('/:roomId', upload.single('file'), uploadFile);

module.exports = router;
