var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Login = require("../models/log");
const Job = require("../models/job");
const Education = require("../models/education");



router.post("/newJob", (req, res) => {
    console.log("hello");
});