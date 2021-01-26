var express = require("express");
var router = express.Router();
var multer = require("multer");

const User = require("../models/Users");
const Login = require("../models/log");
const Job = require("../models/job");
const JobApplied = require("../models/jobapplied");
const File = require("../models/file");


const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../uploads");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage: Storage });



// GET request 
// Getting all the users
router.get("/", function (req, res) {
    File.find(function (err, files) {
        if (err) {
            console.log(err);
        } else {
            res.json(files);
        }
    })
});


router.post("/addfile", upload.single("profilepic"), (req, res) => {
    const newFile = new File({
        user_id: req.body.id,
        user_email: req.body.email,
        image: req.file.originalname
    });
    console.log(newFile)
    newFile.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/upload", upload.single("profilepic"), (req, res) => {
    const query = {
        "user_id": req.body.id,
        "user_email": req.body.email
    };
    const update = {
        $set: {
            image: req.file.originalname
        }
    };
    const options = { "upsert": false };
    User.updateOne(query, update, options)
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            console.log(result);
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new file .`)
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(`Failed to add review: ${err}`);
            res.status(400).send(err);
        });

})

module.exports = router;