const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const RatingSchema = new Schema({
    by_id: {
        type: String,
        required: true
    },
    rated_id: {
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