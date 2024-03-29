import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import login from './components/Common/login'
import newJob from './components/Common/newjob'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
import Userl from './components/Users/Userlistreal'
import Myapplication from './components/Applicant_only/myapplications'
import Recruiterlist from './components/Users/Recruiterlist'
import Jobdetails from './components/Users/Jobdetails'
import Jobdashboard from './components/Recruiter_only/job_dashboard'
import AcceptedApplicants from './components/Recruiter_only/acptedaplcnts'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/users/jobapplicant/:id" name="id" exact component={UsersList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={login} />
        <Route path="/profile/:id" name="id" component={Profile} />
        <Route path="/newJob/:id" name="id" component={newJob} />
        <Route path="/Userl" component={Userl} />
        <Route path="/myapplication/:id" name="id" component={Myapplication} />
        <Route path="/users/recruiter/:id" name="id" component={Recruiterlist} />
        <Route path="/jobapplied" component={Jobdetails} />
        <Route path="/users/jobdashboard/:id1/:id2" exact component={Jobdashboard} />
        <Route path="/acceptedapplicants/:id1/:id2" exact component={AcceptedApplicants} />
      </div>
    </Router>
  );
}

export default App;
