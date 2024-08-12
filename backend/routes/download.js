const express = require('express');
const path = require('path');
const File = require('../models/File');

const router = express.Router();

router.get('/:fileId', async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = path.join(__dirname, '../', file.path);
    res.download(filePath, file.filename);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
});

module.exports = router;
