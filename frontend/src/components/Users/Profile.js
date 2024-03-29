// you have to make Update password here okay Which is really neccesary

import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [{ _id: 1, username: "", email: "" }],
            username: '',
            company_name: '',
            contact_number: '',
            id_param: this.props.match.params.id,
            email: '',
            jobs: [],
            bio: '',
            needed_id: '',
            tempusername: '',
            password: '',
            tempbio: '',
            languages: '',
            addlanguage: '',
            rating: '',
            education: [{ "id": 0, "name": '', "sdate": '', "edate": '' }],
            tempeduname: '',
            tempedusdate: '',
            tempeduedate: '',
            gotologin: false,
            filename: '',
            motive: '',
            jobsapplied: []
        };

        this.OnSignout = this.OnSignout.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleeduClick = this.handleeduClick.bind(this);
        this.handleedudelClick = this.handleedudelClick.bind(this);
        this.updateusername = this.updateusername.bind(this);
        this.Savevalue = this.Savevalue.bind(this);
        // this.onChangeimage = this.onChangeimage.bind(this);
        // this.changeonClick = this.changeonClick.bind(this);
    }
    /* array = [] */
    componentDidMount() {

        axios.get('http://localhost:4000/job')
            .then(response => {
                console.log("jobs :")
                console.log(response.data);
                this.setState({
                    jobs: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/jobapplied')
            .then(response => {
                console.log("jobsapplied")
                console.log(response.data);
                this.setState({
                    jobsapplied: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/user')
            .then(response => {
                console.log("here are the users : ")
                console.log(response.data)
                this.setState({ users: response.data });
                if (sessionStorage.getItem('email') == null) {
                    this.setState({
                        gotologin: true
                    })
                } else {
                    this.setState({
                        email: sessionStorage.getItem('email'),
                        motive: sessionStorage.getItem('motive')
                    });
                }
                this.updateusername();
            })
    }

    // onChangeimage(event) {
    //     this.setState({
    //         filename: event.target.value
    //     });
    // }

    // changeonClick(event) {
    //     event.preventDefault();
    //     var temp = this.state.users.find(word => word.email == this.state.email);
    //     const formData = new FormData();
    //     formData.append("profilepic", filename);
    //     formData.append("user_email", this.state.email);
    //     formData.append("user_id", temp._id);

    //     axios.post('http://localhost:4000/addfile/', formData)
    //         .then(() => { console.log('Resolved 1') })
    //         .catch(() => { console.log('Rejected 1') });
    // }

    onChangeusername(event) {
        console.log(this.state.id_param);
        this.setState({ tempusername: event.target.value });
    }

    handleClick(event) {
        var temp = this.state.languages.trim() + ' ' + this.state.addlanguage.trim();
        this.setState({ languages: temp, addlanguage: '' });
    }

    handleeduClick(event) {
        var temp = this.state.education;
        var idvalue = temp.length;
        console.log(temp.id);
        if (this.state.tempeduedate.length > 0) {
            if (parseInt(this.state.tempeduedate) < parseInt(this.state.tempedusdate)) {
                document.getElementById("para_id").innerHTML = "" +
                    "Check Intitute end date"
                return;
            }
        }
        if (this.state.tempeduname.length <= 1 || this.state.tempedusdate <= 1950 || this.state.tempedusdate > 2040) {
            document.getElementById("para_id").innerHTML = "" +
                "Start date or institute name is required"
            return;
        }
        var temp1 = {
            "id": idvalue,
            "name": this.state.tempeduname,
            "sdate": this.state.tempedusdate,
            "edate": this.state.tempeduedate
        };
        temp.push(temp1);
        this.setState({
            education: temp,
            tempeduname: '',
            tempedusdate: '',
            tempeduedate: ''
        });
    }

    handleedudelClick(event) {
        var to_delete = this.state.deleteedu;
        var lengthvalue = this.state.education.length;
        var arr = this.state.education;
        console.log(lengthvalue);
        if (to_delete < lengthvalue && to_delete > 0) {
            arr.splice(to_delete, 1);
        }
        else {
            document.getElementById("para_id").innerHTML = "" +
                "Check your index (which you gave to delete it had to be > 0)"
            return;
        }
        this.setState({ education: arr });
    }

    updateusername() {
        /* console.log(this.state.users[0].email); */
        var ka = this.state.id_param.split('-');
        console.log(ka);
        var flag = true;
        for (var i = 0; i < this.state.users.length; i++) {
            if (this.state.email == this.state.users[i].email) {
                this.setState({
                    username: this.state.users[i].username,
                    contact_number: this.state.users[i].contact,
                    tempusername: this.state.users[i].username,
                    company_name: this.state.users[i].company,
                    bio: this.state.users[i].bio,
                    needed_id: this.state.users[i]._id,
                    tempbio: this.state.users[i].bio,
                    education: this.state.users[i].education,
                    languages: this.state.users[i].languages,
                    password: this.state.users[i].password,
                    rating:this.state.users[i].rating
                });
                console.log(this.state.users[i].education)
                console.log(this.state.tempbio);
                flag = !flag;
                break;
            }
        }
        if (flag) {
            document.getElementById("para_id").innerHTML = "" +
                "There is some ambiguity log data and users data (# matching failed)"
            return;
        }
        if (this.state.motive == "recruiter") {
            document.getElementById("recruiter_section").style.display = "block";
            document.getElementById("applicant_section").style.display = "none";
            if (this.state.users.length > 0 && this.state.jobsapplied.length > 0) {
                var halftemp = this.state.jobs.filter(word => word.email == this.state.email);
                var allaplied = []
                console.log("kteemp here")
                console.log(this.state.jobs);
                console.log(halftemp);
                console.log(this.state.users);
                for (var i = 0; i < halftemp.length; i++) {
                    var ktemp = this.state.jobsapplied.filter(word => word.job_id == halftemp[i]._id && word.status > 2);
                    console.log(ktemp);
                    console.log(" ----- ")
                    for (var j = 0; j < ktemp.length; j++) {
                        allaplied.push(ktemp[j]);
                    }
                }
                console.log("allaplied :")
                console.log(allaplied);
                var rate_total = 0;
                for (var i = 0; i < allaplied.length; i++) {
                    rate_total = rate_total + allaplied[i].recruiter_rating;
                }
                var total_raters = allaplied.length;
                var real_rate;
                if (total_raters !== 0) {
                    real_rate = rate_total / total_raters;
                }
                console.log("rating system :");
                console.log(rate_total);
                console.log(total_raters);
                console.log(real_rate);
                if (real_rate !== null || total_raters !== 0 || real_rate !== NaN) {
                    const data = {
                        rating: real_rate,
                        total_raters: total_raters,
                        user_id: this.state.needed_id,
                        user_email: this.state.email,
                        motive: this.state.email
                    }
                    this.setState({
                        rating: real_rate
                    });
                    console.log(data);
                    axios.post('http://localhost:4000/user/update/ratinghere', data)
                        .then((res) => {
                            console.log('Resolved 1');
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log('Rejected 1');
                            console.log(err);
                        })
                }
            }

            console.log(this.state.needed_id);
        }
        else {
            if (this.state.motive == "jobapplicant")
                console.log("hello jobapplicant ");
            document.getElementById("recruiter_section").style.display = "none";
            document.getElementById("applicant_section").style.display = "block";
            if (this.state.users.length > 0 && this.state.jobsapplied.length > 0) {
                var tempval = this.state.jobsapplied.filter(word => word.applicant_id == this.state.needed_id);
                var rate_total = 0;
                for (var i = 0; i < tempval.length; i++) {
                    rate_total = rate_total + tempval[i].applicant_rating;
                }
                var total_raters = tempval.length;
                var real_rate = rate_total / total_raters;
                console.log("rating system :");
                console.log(rate_total);
                console.log(total_raters);
                console.log(real_rate);
                if (real_rate !== null || total_raters !== 0 || real_rate !== NaN) {
                    const data = {
                        rating: real_rate,
                        total_raters: total_raters,
                        user_id: this.state.needed_id,
                        user_email: this.state.email,
                        motive: this.state.email
                    }
                    this.setState({
                        rating: real_rate
                    });
                    console.log(data);
                    axios.post('http://localhost:4000/user/update/ratinghere', data)
                        .then((res) => {
                            console.log('Resolved 1');
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log('Rejected 1');
                            console.log(err);
                        })
                }
            }
        }
    }

    Savevalue(event) {
        event.preventDefault();
        var flag = false;
        const switch_val = [
            this.state.languages,
            this.state.education,
            this.state.username,
            this.state.company_name,
            this.state.contact_number,
            this.state.bio
        ]
        const UpdateUser = {
            username: this.state.tempusername,
            languages: this.state.languages,
            education: this.state.education,
            email: this.state.email,
            password: this.state.password,
            motive: this.state.motive,
            company_name: this.state.company_name,
            contact_number: this.state.contact_number,
            bio: this.state.bio
        }
        console.log(UpdateUser.education);
        var sflag = 0;
        var eflag = 2;
        var flag_imp = true;
        if (this.state.motive == "recruiter") {
            sflag = 3;
            eflag = 5;
        }
        console.log(this.state.users)
        var value = this.state.bio.split(" ");
        if (value.length >= 250) {
            document.getElementById("para_id").innerHTML = "" +
                "250 word limit in bio Please Change it"
            return;
        }
        if (this.state.tempusername.length <= 0) {
            document.getElementById("para_id").innerHTML = "" +
                "Username can't be empty String"
            return;
        }
        if (this.state.education.length <= 1 && this.state.motive == "jobapplicant") {
            document.getElementById("para_id").innerHTML = "" +
                "Enter Your education institutes"
            return;
        }
        console.log(switch_val[3]);
        for (var i = sflag + 1; i < eflag; i++) {
            console.log(switch_val[i] + ' ' + switch_val[i].length + ' ' + i);
            if (switch_val[i].length <= 0) {
                flag_imp = true;
                document.getElementById("para_id").innerHTML = "" +
                    "Please Enter all the Field's correctly"
                return;
            } else {
                if (i == switch_val.length) {
                    document.getElementById("para_id").innerHTML = "<br />";
                }
            }
        }
        console.log(UpdateUser);
        if (flag_imp) {
            axios.post('http://localhost:4000/user/update', UpdateUser)
                .then(() => { console.log('Resolved 1') })
                .catch(() => { console.log('Rejected 1') })
        }
        window.location.reload()
    }

    OnSignout(event) {
        event.preventDefault();
        console.log(this.state.users);
        sessionStorage.clear();
        axios.post('http://localhost:4000/user/signout')
            .then(res => {
                /* alert("Signed out"); */
                console.log("Signed out")
            });
        this.setState({
            gotologin: true
        })
    }

    render() {
        const edulist = this.state.education.map(items => {
            console.log(items);
            return <pre><p key={items.id}>id: {items.id}, name: {items.name}, Start date: {items.sdate}, End date: {items.edate} </p></pre>
        })
        if (this.state.gotologin) {
            var id = this.state.id_param;
            console.log(id);
            return <Redirect to={`/login`} />
        }
        return (
            <div>
                <div style={{ display: "block" }}>
                    <div className="Start">
                        <h1 style={{ textAlign: "center" }}>
                            Profile
                        </h1>
                    </div>
                    <div>
                        <h4>
                            <p style={{ textAlign: "center", color: "red" }} id="para_id">
                                <br />
                            </p>
                        </h4>
                    </div>
                    <div>
                        <tbody><a href={"/users/" + this.state.motive + "/" + this.state.id_param} >Click to move to dashboard</a></tbody>
                    </div>
                    <br /><br />
                    <div>
                        <div id="common_section" style={{ display: "block" }}>
                            <p>
                                <pre>
                                    <label>UserName : {this.state.username + ' '}</label>
                                    <input type="text" placeholder="New Username write here"
                                        value={this.state.tempusername} name="Username"
                                        onChange={this.onChangeusername} />

                                </pre>
                                <pre><label>Email :  {this.state.email}</label></pre>
                                <pre><label>Rating :  {this.state.rating}</label></pre>
                            </p>
                            <div id="recruiter_section" style={{ display: "none" }}>
                                <div>
                                    <p>
                                        <label><pre>Contact Number :  {this.state.contact_number}</pre></label><br />
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <label><pre>Company Name :  {this.state.company_name}</pre></label><br />
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <label><pre> Bio :{this.state.bio} </pre></label>
                                    </p>
                                    <pre>
                                        <p>
                                            <input type="text" placeholder="Enter your Bio" value={this.state.tempbio}
                                                onChange={e => { this.setState({ tempbio: e.target.value }) }} /> <Button size="sm"
                                                    onClick={e => { this.setState({ bio: this.state.tempbio }) }}>
                                                Update your Bio
                                        </Button> <Button size="sm" onClick={e => {
                                                this.setState({
                                                    bio: '',
                                                    tempbio: ''
                                                })
                                            }}>
                                                Clear your Bio
                                        </Button>
                                        </p>
                                    </pre>
                                </div>
                                <div>
                                    <p>
                                        <a href={'/newjob/' + this.state.id_param + '/'}>
                                            Click to create New job</a>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <a href={'/acceptedapplicants/' + this.state.id_param + '/' + this.state.needed_id + '/'}>
                                            Checkout list of all Applicants Accepted by You</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div id="applicant_section" style={{ display: "block" }}>
                            <div>
                                <p>
                                    <label><pre>Languages/technologies :  {this.state.languages}</pre></label><br />
                                </p>
                                <p>
                                    <pre>
                                        <input type="text" placeholder="add languages" value={this.state.addlanguage}
                                            onChange={e => { this.setState({ addlanguage: e.target.value }) }} />  <Button size="sm"
                                                onClick={this.handleClick}>
                                            Add
                                            </Button> <Button size="sm" onClick={e => { this.setState({ languages: '' }) }}>
                                            clear
                                        </Button>
                                    </pre>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <label><pre>Education: {edulist}</pre></label>
                                </p>
                                <p>
                                    <pre><label>Institute name </label>
                                        <input type="text" placeholder="New Institute Name" value={this.state.tempeduname}
                                            onChange={e => { this.setState({ tempeduname: e.target.value }) }} /><br /></pre>
                                    <pre><label>Starting Year </label>
                                        <input type="Number" placeholder="Start Date" value={this.state.tempedusdate}
                                            onChange={e => { this.setState({ tempedusdate: e.target.value }) }} /><br /></pre>
                                    <pre><label>Ending Year </label>
                                        <input type="Number" placeholder="End Date" value={this.state.tempeduedate}
                                            onChange={e => { this.setState({ tempeduedate: e.target.value }) }} /><br /></pre>
                                    <Button size="sm" onClick={this.handleeduClick}>
                                        Add Institute
                                    </Button><br /><br />
                                    <pre><label>Enter intitute id to delete that institute </label>
                                        <input type="Number" placeholder="id" value={this.state.deleteedu}
                                            onChange={e => { this.setState({ deleteedu: e.target.value }) }} /> <Button
                                                size="sm" onClick={this.handleedudelClick}>
                                            Delete
                                    </Button><br /><br />
                                    </pre>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <a href={'/myapplication/' + this.state.id_param + '/'} >
                                        Click to view your all Application</a>
                                </p>
                            </div>
                        </div>
                        <div>
                            <p>
                                <Button size="sm" onClick={this.Savevalue}>
                                    save changes
                                </Button><br />
                            </p>
                        </div>
                    </div>
                    <div >
                        <br />
                        <Button style={{ alignSelf: 'center' }} size="sm" value="Signout" onClick={this.OnSignout}>
                            Sign out
                        </Button>
                    </div>
                </div>
            </div >
        )
    }
}

export default Profile;