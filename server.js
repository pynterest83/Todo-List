const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/todolist", require("./routes/listRoute"));

// Set up server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});