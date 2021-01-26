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
            /* console.log(jobapplied); */
        }
    })
});


router.post("/jobappliedsave", (req, res) => {
    const newjobapp = new JobApplied({
        job_id: req.body.job_id,
        applicant_id: req.body.applicant_id,
        applicant_email: req.body.applicant_email,
        sop: req.body.sop,
        status: req.body.status,
        date_of_application: req.body.date_of_application
    });
    console.log("jobappliedBelow :")
    console.log(newjobapp);
    newjobapp.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/updatestatus", (req, res) => {
    const query = {
        "_id": req.body.required_id,
    };
    var update;
    if (parseInt(req.body.status) == 3) {
        update = {
            $set: {
                status: parseInt(req.body.status),
                date_of_joining: Date.now()
            }
        };
    } else {
        update = {
            $set: {
                status: parseInt(req.body.status)
            }
        };
    }
    const options = { "upsert": false };
    JobApplied.updateOne(query, update, options)
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new review (job status wala).`)
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(`Failed to add review (job status wala) : ${err}`);
            res.status(400).send(err);
        });
})

router.post("/update/rating", (req, res) => {
    console.log(req.body._id);
    const query = {
        "_id": req.body._id,
        "applicant_email": req.body.applicant_email
    };
    const update = {
        $set: {
            recruiter_rating: parseInt(req.body.recruiter_rating),
            applicant_rating: parseInt(req.body.applicant_rating)
        }
    };
    const options = { "upsert": false };
    JobApplied.updateOne(query, update, options)
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            console.log(result);
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new review (rating wala).`)
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(`Failed to add review: ${err}`);
            res.status(400).send(err);
        });
});

module.exports = router;