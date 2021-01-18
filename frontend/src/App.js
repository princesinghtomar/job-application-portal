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
import Sop from './components/Applicant_only/sop';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/newJob" component={newJob}/>
        <Route path="/Userl" component={Userl}/>
        <Route path="/sop" component={Sop}/>
      </div>
    </Router>
  );
}

export default App;
