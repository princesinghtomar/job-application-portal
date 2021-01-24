const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const RatingSchema = new Schema({
    applicant_id: {
        type: String,
        required: true
    },
    jobapplicant_id: {
        type: String,
        required: false
    },
    job_id: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    }
});

module.exports = Rate = mongoose.model("Ratings", RatingSchema);