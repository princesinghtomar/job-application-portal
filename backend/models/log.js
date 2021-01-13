const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const LogSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    motive: {
        type: String,
        required: true
    }
});

module.exports = Log = mongoose.model("Logs", LogSchema);