const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const {v4: uuidv4} = require('uuid');

// Set storage engine - using memory storage for Vercel compatibility
let storage = multer.memoryStorage();

// Initialize upload
const upload = multer({
    storage,
    limits: {fileSize: 1000000 * 100} // 100 mb
}).single('myfile');

router.post('/', (req, res) => {
    console.log('Upload request received');
    // Store file
    upload(req, res, async (err) => {
        console.log('Multer processed request');
        console.log('req.file:', req.file);
        console.log('req.body:', req.body);
        console.log('err:', err);
        console.log('Headers:', req.headers);
        // validate request
        if(err) {
            return res.status(500).send({error: err.message});
        }

        if(!req.file) {
            return res.json({error: 'All files are required.'});
        }

        // Store into database
        const file = new File({
            filename: req.file.originalname,
            uuid: uuidv4(),
            path: req.file.originalname, // For memory storage, we'll store the original filename
            size: req.file.size
        });

        const response = await file.save();
        
        // Response -> Link
        res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
    })
});

router.post('/send', async (req, res) => {
    console.log(req.body);
    const {uuid, receiver, sender} = req.body;

    // Validate request
    if(!uuid || !receiver || !sender) {
        return res.status(422).send({ error: 'All fields are required.'});
    }

    // Get data from database
    try {
        const file = await File.findOne({ uuid: uuid });

        if(!file) {
            return res.status(404).send({ error: 'File not found.' });
        }
    
        if(file.sender) {
            return res.status(422).send({ error: 'Email already sent once.'});
        }

        file.sender = sender;
        file.receiver = receiver;
        const response = await file.save();

        console.log('Sending email from:', sender, 'to:', receiver);

        // Send mail
        const sendMail = require('../services/mailService.js');
        sendMail({
            sender,
            receiver,
            subject: `InShare File sharing`,
            text: `${sender} shared a file with you`,
            html: require('../services/emailTemplate')({
                sender, 
                size: parseInt(file.size/1000) + ' KB',
                downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email` ,
                expires: '24 hours'
            })
        }).then(() => {
            return res.json({success: true});
        }).catch(err => {
            return res.status(500).json({error: 'Error in email sending.'});
        });
    }catch(err) {
        return res.status(500).send({ error: 'Something went wrong.'});
    }
})


module.exports = router;