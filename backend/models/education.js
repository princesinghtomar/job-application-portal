const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const EduSchema = new Schema({
    institute: {
        type: String,
        required: true
    },
    starting_year: {
        type: Date,
        required: true
    },
    ending_date: {
        type: Date,
        required: false
    }
});

module.exports = Eduschema = mongoose.model("education_schema", Eduschema);