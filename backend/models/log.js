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
    last_login: {
        type: Date,
        required: false
    }
});

module.exports = Log = mongoose.model("Logs", UserSchema);