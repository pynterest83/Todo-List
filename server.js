const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDB = require('./config/DBconnect');

// Connect to database
connectDB();
const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/", require("./routes/listRoute"));

// Serve static files
app.use(express.static('view'));

// Error handling middleware
app.use(errorHandler);

// Set up server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});