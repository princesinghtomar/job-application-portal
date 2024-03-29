const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const JobAppliedSchema = new Schema({
    job_id: {
        type: String,
        required: true,
    },
    applicant_id: {
        type: String,
        required: true
    },
    applicant_email: {
        type: String,
        required: true
    },
    sop: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: false
    },
    date_of_joining: {
        type: String,
        required: false
    },
    date_of_application: {
        type: String,
        required: false
    },
    recruiter_rating: {
        type: Number,
        required: false,
        default: 4
    },
    applicant_rating: {
        type: Number,
        required: false,
        default: 4
    }
});

module.exports = JobA = mongoose.model("JobApply", JobAppliedSchema);