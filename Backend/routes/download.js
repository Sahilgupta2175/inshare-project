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

        // For Vercel deployment with memory storage, files don't persist
        // Show download page with file info but explain limitation
        return res.render('download', { 
            error: 'File upload successful but download not available in this demo version. Files don\'t persist in serverless environment.' 
        });
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
});

module.exports = router;