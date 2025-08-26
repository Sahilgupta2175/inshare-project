const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require('./config/database.js');
const path = require('path');
const cors = require('cors');

// Database Connections
connectDB();

app.use(express.static('public'));
app.use(express.json());

// Cors
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors());

// Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.send("Hello, I am root.");
});

app.use('/api/files', require('./routes/file.js'));
app.use('/files', require('./routes/show.js'));
app.use('/files/download', require('./routes/download.js'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});