const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const {v4: uuidv4} = require('uuid');

// Set storage engine
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: function(req, file, cb) {
        const name = path.parse(file.originalname).name;
        const uniqueName = `${name}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// Initialize upload
const upload = multer({
    storage,
    limits: {fileSize: 1000000 * 100} // 100 mb
}).single('myfile');

router.post('/', (req, res) => {
    // Store file
    upload(req, res, async (err) => {
        // validate request
        if(!req.file) {
            return res.json({error: 'All files are required.'});
        }

        if(err) {
            return res.status(500).send({error: err.message});
        }

        // Store into database
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
    })

    // Response -> Link
});


module.exports = router;