const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var JobRouter = require("./routes/Jobs");
var LoginRouter = require("./routes/login");
var JobAppliedRouter = require("./routes/jobapplied");
var File = require("./routes/file");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/login", LoginRouter);
app.use("/jobapplied", JobAppliedRouter);
app.use("/file", File);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
