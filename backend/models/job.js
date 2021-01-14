const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const JobSchema = {
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    max_applicants: {
        type: Number,
        required: true
    },
    max_positions: {
        type: Number,
        required: true
    },
    date_posting: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    required_skills: {
        type: String,
        required: true
    },
    job_type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}

module.exports = JOB = mongoose.model("Jobs", JobSchema);