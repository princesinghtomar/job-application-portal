const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const LogSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    motive: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: false
    }
});

module.exports = Log = mongoose.model("Logs", LogSchema);