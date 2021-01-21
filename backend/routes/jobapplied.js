var express = require("express");
var router = express.Router();

const User = require("../models/Users");
const Login = require("../models/log");
const Job = require("../models/job");
const JobApplied = require("../models/jobapplied");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    JobApplied.find(function (err, jobapplied) {
        if (err) {
            console.log(err);
        } else {
            res.json(jobapplied);
            console.log(jobapplied);
        }
    })
});


router.post("/jobappliedsave", (req, res) => {
    const newjobapp = new JobApplied({
        job_id: req.body.job_id,
        applicant_id: req.body.applicant_id,
        applicant_email: req.body.applicant_email,
        sop: req.body.sop,
        status: req.body.status
    });
    console.log(newjobapp);
    newjobapp.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;