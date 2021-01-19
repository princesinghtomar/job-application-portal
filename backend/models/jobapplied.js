const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const JobApplied = new Schema({
    job_id: {
        type: String,
        required: true,
    },
    applicant_id: {
        type: String,
        required: true
    },
    sop:{
        type:String,
        required:true
    }
});

module.exports = JobA = mongoose.model("JobApply", JobApplied);