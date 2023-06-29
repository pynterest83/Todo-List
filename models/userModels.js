const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please fill in this field"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: [true, "Please fill in this field"]
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);