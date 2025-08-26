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

        const filePath = `${__dirname}/../${file.path}`;
        
        // Check if file exists (for development)
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            // For Vercel deployment where files don't persist
            return res.render('download', { 
                error: 'File not available for download. This is a demo version.' 
            });
        }
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
});

module.exports = router;