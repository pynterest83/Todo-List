const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDB = require('./config/DBconnect');
const cors = require("cors");
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Error handling middleware
app.use(errorHandler);

app.use("/user", require("./routes/userRoute"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/user/login", (req, res) => {
    res.render("login");
});
app.get("/user/register", (req, res) => {
    res.render("register");
});

app.get("/list", (req, res) => {
    res.render("app");
});

app.use("/list", require("./routes/listRoute"));

// Set up server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});