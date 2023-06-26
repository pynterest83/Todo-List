const moongose = require('mongoose');
const Schema = moongose.Schema;

const noteSchema = new Schema({
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

module.exports = moongose.model("Note", noteSchema);