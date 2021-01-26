const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const FileSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    cv: {
        type: String,
        required: false
    }
});

module.exports = File = mongoose.model("Files", FileSchema);