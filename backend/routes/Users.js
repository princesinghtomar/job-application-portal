var express = require("express");
var router = express.Router();
// var multer = require("multer");

// Load User model
const User = require("../models/Users");
const Login = require("../models/log");
const Job = require("../models/job");
const JobApplied = require("../models/jobapplied");


// const Storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../uploads");
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// })

// const upload = multer({ storage: storage });

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        id: '1',
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        motive: req.body.motive,
        company: req.body.company_name,
        contact: req.body.contact_number,
        education: '',
        languages: '',
        bio: '',
        openapplication: 0,
        rating: 4,
        total_raters: 1
    });
    User.collection.findOne({ "email": req.body.email })
        .then(result => {
            if (result) {
                res.status(200).json("Email already taken");
            } else {
                console.log(newUser)
                newUser.save()
            }
        })
        .catch(err => {
            console.log("Error: In the '/user/register' backend server");
            console.log(err);
        });
});

// - image/file

// router.post("/upload", upload.single("profilepic"), (req, res) => {
//     const query = {
//         "email": req.body.email,
//         "_id": req.body._id
//     };
//     const update = {
//         $set: {
//             image: req.file.profilepic
//         }
//     };
//     const options = { "upsert": false };
//     User.updateOne(query, update, options)
//         .then(result => {
//             const { matchedCount, modifiedCount } = result;
//             console.log(result);
//             if (matchedCount && modifiedCount) {
//                 console.log(`Successfully added a new file .`)
//             }
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             console.error(`Failed to add review: ${err}`);
//             res.status(400).send(err);
//         });

// })


// POST request 
// Login
router.post("/signout", (req, res) => {
    Login.collection.drop();
});

router.post("/update", (req, res) => {
    const newUser = new User({
        id: '1',
        username: req.body.username,
        languages: req.body.languages,
        education: req.body.education,
        email: req.body.email,
        password: req.body.password,
        motive: req.body.motive,
        company: req.body.company_name,
        contact: req.body.contact_number,
        bio: req.body.bio
    });
    console.log(newUser);
    const query = { "email": req.body.email };
    const update = {
        $set: {
            id: '1',
            username: req.body.username,
            languages: req.body.languages,
            education: req.body.education,
            email: req.body.email,
            password: req.body.password,
            motive: req.body.motive,
            company: req.body.company_name,
            contact: req.body.contact_number,
            bio: req.body.bio
        }
    };
    const options = { "upsert": false };
    User.updateOne(query, update, options)
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new review.`)
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(`Failed to add review: ${err}`);
            res.status(400).send(err);
        });

});

router.post("/update/ratinghere", (req, res) => {
    console.log(req.body._id);
    const query = {
        "_id": req.body.user_id,
        "email": req.body.user_email
    };
    const update = {
        $set: {
            rating: req.body.rating,
            total_raters: req.body.total_raters
        }
    };
    const options = { "upsert": false };
    User.updateOne(query, update, options)
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            console.log(result);
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new review (user rating wala).`)
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(`Failed to add review: ${err}`);
            res.status(400).send(err);
        });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const newSignin = new Login({
        id: 1,
        email: req.body.email,
        password: req.body.password,
        motive: req.body.motive,
        company: req.body.company
    });
    const update = {
        "$set": {
            id: '1',
            email: newSignin.email,
            password: newSignin.password,
            motive: newSignin.motive,
            company: newSignin.company
        }
    };
    const query = { "id": "1" };
    const options = { "upsert": false };
    var found = false;
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
    Login.collection.findOne({ id: '1' })
        .then(result => {
            if (result) {
                User.collection.findOne({ email: newSignin.email })
                    .then(result1 => {
                        if (result1) {
                            try {
                                Login.updateOne(query, update, options)
                                    .then(result => {
                                        const { matchedCount, modifiedCount } = result;
                                        if (matchedCount && modifiedCount) {
                                            console.log(`Successfully added a new review.`)
                                        }
                                    })
                                    .catch(err => console.error(`Failed to add review: ${err}`))
                            } catch (e) {
                                console.log(e);
                            }
                            console.log(`Successfully found document User.collection.findOne({ email: newSignin.email }): ${result1}.`);
                        } else {
                            console.log("No document (User.collection.findOne({ email: newSignin.email })) matches the provided query.");
                        }
                    })
                    .catch(err => console.error(`Failed to find document (User.collection.findOne({ email: newSignin.email })): ${err}`));
                console.log(`Successfully found document (Login.collection.findOne({ id: '1' })): ${result}.`);
            } else {
                User.collection.findOne({ id: '1' })
                    .then(result1 => {
                        if (result1) {
                            newSignin.save()
                                .then(user => {
                                    res.status(200).json(user);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                            console.log(`Successfully found document (User.collection.findOne({ id: '1' })) : ${result1}.`);
                        } else {
                            console.log("No document (User.collection.findOne({ id: '1' })) matches the provided query.");
                        }
                    })
                    .catch(err => console.error(`Failed to find document (User.collection.findOne({ email: newSignin.email })): ${err}`));
                console.log("No document matches the provided query (Login.collection.findOne({ id: '1' })).");
            }
        })
        .catch(err => console.error(`Failed to find document: ${err}`));
    /* Job.collection.drop()
    Login.collection.drop()
    User.collection.drop()
    JobApplied.collection.drop()*/
});

module.exports = router;

