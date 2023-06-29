const mongoose = require('mongoose');

const noteSchema =  mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Please fill in this field"]
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
        required: [true, "Please fill in this field"]
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Note", noteSchema);