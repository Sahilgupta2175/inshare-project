const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require('./config/database.js');

// Database Connections
connectDB();

app.get('/', (req, res) => {
    res.send("Hello, I am root.");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});