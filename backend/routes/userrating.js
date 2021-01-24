var express = require("express");
var router = express.Router();

const User = require("../models/Users");
const Login = require("../models/log");
const Job = require("../models/job");
const JobApplied = require("../models/jobapplied");
const UserRating = require("../models/userrating");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    UserRating.find(function (err, userrating) {
        if (err) {
            console.log(err);
        } else {
            res.json(userrating);
            /* console.log(userrating); */
        }
    })
});


router.post("/userratingsave", (req, res) => {
    const newuserrating = new UserRating({
        applicant_id: req.body.applicant_id,
        jobapplicant_id: req.body.jobapplicant_id,
        job_id: req.body.job_id,
        rating: req.body.rating
    });
    console.log("UserRatingBelow :")
    console.log(newuserrating);
    newuserrating.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("userratingupdate", (req, res) => {
    const query = {
        "_id": req.body.required_id,
    };
    const update = {
        $set: {
            rating: parseInt(req.body.rating)
        }
    };
    const options = { "upsert": false };
    UserRating.updateOne(query, update, options)
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new review (UserRating status wala).`)
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(`Failed to add review (UserRating status wala) : ${err}`);
            res.status(400).send(err);
        });
});

module.exports = router;