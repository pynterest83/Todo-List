const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

//@desc Register a user
//@route POST /api/user/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const userAvailable = await User.findOne({username});
    if (userAvailable) {
        res.status(400);
        throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, password: hashedPassword});
    if (user) {
        res.status(201).json({
            _id: user._id,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
})

//@desc Login a user
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const user = await User.findOne({username});
    if (user && (await bcrypt.compare(password, user.password))) {
        const access =  jwt.sign({
            user: {
                username: user.username,
                id: user._id
            }
        }, process.env.JWT_SECRET_KEY, {expiresIn: "15m"})
        res.status(200).json({access})
    }
    else {
        res.status(401);
        throw new Error("Invalid username or password");
    }
});

//@desc Get current user
//@route POST /api/user/current
//@access Private

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, getCurrentUser};