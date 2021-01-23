var express = require("express");
var router = express.Router();

const User = require("../models/Users");
const Login = require("../models/log");
const Job = require("../models/job");
const JobApplied = require("../models/jobapplied")

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Login.find(function (err, logs) {
        if (err) {
            console.log(err);
        } else {
            res.json(logs);
        }
    })
});


router.post("/login", (req, res) => {
    const newLog = new Login({
        id: '1',
        email: req.body.email,
        password: req.body.password,
        motive: req.body.motive,
        company: req.body.company
    });
    console.log(newLog)
    newLog.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;