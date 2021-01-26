var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Login = require("../models/log");
const Job = require("../models/job");

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
            res.status(200).json(job);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/update/rating", (req, res) => {
    console.log(req.body._id);
    const query = {
        "_id": req.body._id,
        "email": req.body.email,
    };
    const update = {
        $set: {
            rating: parseInt(req.body.rating)
        }
    };
    const options = { "upsert": false };
    Job.updateOne(query, update, options)
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

router.post("/update/number_of_applicants", (req, res) => {
    console.log(req.body);
    const query = {
        "_id": req.body._id,
        "email": req.body.email
    };
    const update = {
        $set: {
            number_of_applicants: req.body.number_of_applicants,
        }
    };
    const options = { "upsert": false };
    Job.updateOne(query, update, options)
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            console.log(result);
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new review (number of applicants wala).`)
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(`Failed to add review: ${err}`);
            res.status(400).send(err);
        });
});


router.post("/update/maxanddeadline", (req, res) => {
    console.log(req.body);
    const query = {
        "_id": req.body._id,
        "email": req.body.email
    };
    console.log("hello");
    console.log(query);
    console.log(req.body.max_applicants < req.body.max_positions);
    var temp = (req.body.max_applicants < req.body.max_positions) ? req.body.max_positions : req.body.max_applicants;
    console.log("helloo");
    const update = {
        $set: {
            max_applicants: temp,
            max_positions: parseInt(req.body.max_positions),
            deadline: req.body.deadline
        }
    };
    console.log(update)
    const options = { "upsert": false };
    Job.updateOne(query, update, options)
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new review (max wala).`)
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(`Failed to add review (max wala): ${err}`);
            res.status(400).send(err);
        });
});

router.post("/delete", (req, res) => {
    console.log(req.body);
    const query = {
        "_id": req.body._id,
    };
    console.log(query);
    Job.deleteOne(query)
        .then((res, Job) => {
            if (res) {
                res.json({ msg: "customer deleted", deleted: Job });
            }
        })
        .catch(err => {
            console.log(err);
        })
});

router.post("/updatestatus", (req, res) => {
    const query = {
        "_id": req.body.required_id,
    };
    const update = {
        $set: {
            status: req.body.status
        }
    };
    const options = { "upsert": false };
    Job.updateOne(query, update, options)
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

module.exports = router;