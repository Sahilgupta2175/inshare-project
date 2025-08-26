const express = require('express');
const router = express.Router();
const File = require('../models/file.js');
const fs = require('fs');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({uuid: req.params.uuid});
        
        if(!file) {
            return res.render('download', { error: 'Link has been expired.'});
        }

        // If file has data stored in database, serve it for download
        if (file.data) {
            res.set({
                'Content-Type': file.mimetype || 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${file.filename}"`,
                'Content-Length': file.size
            });
            return res.send(file.data);
        } else {
            // Fallback if no data is stored
            return res.render('download', { 
                error: 'File data not available.' 
            });
        }
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
});

module.exports = router;