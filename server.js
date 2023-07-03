const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDB = require('./config/DBconnect');
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Serve static files
app.use(express.static('views'));

// Routes
app.use("/api/list", require("./routes/listRoute"));
app.use("/api/user", require("./routes/userRoute"));

// Error handling middleware
app.use(errorHandler);

// Set up server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});