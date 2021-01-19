var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Login = require("../models/log");
const Job = require("../models/job");
const { route } = require("./Users");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Job.find(function (err, jobs) {
        if (err) {
            console.log(err);
        } else {
            res.json(jobs);
        }
    })
});

router.post("/newjob", (req, res) => {
    const newJob = new Job({
        title: req.body.title,
        email: req.body.email,
        name: req.body.name,
        max_applicants: req.body.max_applicants,
        max_positions: req.body.max_positions,
        date_posting: req.body.date_posting,
        deadline: req.body.deadline,
        required_skills: req.body.required_skills,
        job_type: req.body.job_type,
        duration: req.body.duration,
        salary: req.body.salary,
        rating: req.body.rating,
        status: req.body.status,
        number_of_applicants: 0
    });
    console.log(newJob);
    newJob.save()
        .then(job => {
            res.status(200).json("fully saved");
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;