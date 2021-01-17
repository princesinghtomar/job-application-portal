import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [{ _id: 1, username: "", email: "" }],
            logedin_user: [{ _id: 1, email: "loading" }],
            username: '',
            company_name: '',
            contact_number: '',
            bio: '',
            tempusername: '',
            tempbio: '',
            languages: 'c++',
            addlanguage: '',
            rating: '4',
            education: [{ "id": '0', "name": '', "sdate": '', "edate": '' }],
            tempeduname: '',
            tempedusdate: '',
            tempeduedate: '',
        };

        this.OnSignout = this.OnSignout.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleeduClick = this.handleeduClick.bind(this);
        this.handleedudelClick = this.handleedudelClick.bind(this);
        this.updateusername = this.updateusername.bind(this);
        this.Savevalue = this.Savevalue.bind(this);
    }
    /* array = [] */
    componentDidMount() {
        axios.get('http://localhost:4000/login')
            .then(response => {
                console.log(response.data);
                this.setState({ logedin_user: response.data });
            });

        axios.get('http://localhost:4000/user')
            .then(response => {
                console.log(response.data)
                this.setState({ users: response.data });
                this.updateusername();
            })
    }

    onChangeusername(event) {
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
        console.log(this.state.users[1].email);
        var flag = true;
        for (var i = 0; i < this.state.users.length; i++) {
            if (this.state.logedin_user[0].email == this.state.users[i].email &&
                this.state.logedin_user[0].password == this.state.users[i].password &&
                this.state.logedin_user[0].motive == this.state.users[i].motive
            ) {
                this.setState({
                    username: this.state.users[i].username,
                    contact_number: this.state.users[i].contact,
                    company_name: this.state.users[i].company,
                    bio: this.state.users[i].bio,
                    tempbio: this.state.users[i].bio
                });
                console.log("Helllloo");
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
        if (this.state.logedin_user[0].motive == "recruiter") {
            document.getElementById("recruiter_section").style.display = "block";
            document.getElementById("applicant_section").style.display = "none";
        }
        else {
            document.getElementById("recruiter_section").style.display = "none";
            document.getElementById("applicant_section").style.display = "block";
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
            username: this.state.username,
            languages: this.state.languages,
            education: this.state.education,
            email: this.state.logedin_user[0].email,
            password: this.state.logedin_user[0].password,
            motive: this.state.logedin_user[0].motive,
            company_name: this.state.company_name,
            contact_number: this.state.contact_number,
            bio: this.state.bio
        }
        /* console.log("hello1"); */
        var sflag = 0;
        var eflag = 2;
        var flag_imp = true;
        if (this.state.logedin_user[0].motive == "recruiter") {
            sflag = 3;
            eflag = 5;
        }
        console.log(this.state.users)
        if (this.state.bio.length > 250) {
            document.getElementById("para_id").innerHTML = "" +
                "250 word limit in bio Please Change it"
            return;
        }
        console.log(switch_val[3]);
        for (var i = sflag+1; i < eflag; i++) {
            /* console.log("asdasd"); */
            console.log(switch_val[i] + ' ' + switch_val[i].length + ' ' + i);
            if (switch_val[i].length <= 0) {
                /* console.log(switch_val[i]); */
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
            axios.post('http://localhost:4000/user/update', { UpdateUser })
                .then(() => { console.log('Resolved 1') })
                .catch(() => { console.log('Rejected 1') })
        }

    }

    OnSignout(event) {
        event.preventDefault();
        console.log(this.state.users);
        axios.post('http://localhost:4000/user/signout')
            .then(res => {
                alert("Signed out");
            });
    }

    render() {
        const edulist = this.state.education.map(items => {
            return <pre><p key={items.id}>id: {items.id}, name: {items.name}, Start date: {items.sdate}, End date: {items.edate} </p></pre>
        })
        return (
            <div><h3>
                <div style={{ display: "block" }}>
                    <div className="Start">
                        <h1 style={{ textAlign: "center" }}>
                            Profile
                        </h1>
                    </div>
                    <div>
                        <p style={{ textAlign: "center", color: "red" }} id="para_id">
                            <br />
                        </p>
                    </div>
                    <div>
                        <div>
                            <p>
                                <label><pre >UserName :  {this.state.username}</pre></label><br />
                            </p>
                            <p>
                                <input type="text" placeholder="New Username write here" value={this.state.tempusername} name="Username"
                                    onChange={this.onChangeusername} />
                            </p>
                        </div>
                        <div>
                            <label><pre>Email :  {this.state.logedin_user[0].email}</pre></label>
                        </div>
                        <div>
                            <p>
                                <label><pre >Rating :  {this.state.rating}</pre></label>
                            </p>
                        </div>
                        <div id="recruiter_section" style={{ display: "none" }}>
                            <div>
                                <p>
                                    <label><pre>Contact Number :  {this.state.contact_number}</pre></label><br />
                                </p>
                            </div>
                            <div>
                                <p>
                                    <label><pre>Company Number :  {this.state.company_name}</pre></label><br />
                                </p>
                            </div>
                        </div>
                        <div>
                            <p>
                                <label><pre> Bio :{this.state.bio} </pre></label>
                            </p>
                            <p>
                                <input type="text" placeholder="Enter your Bio" value={this.state.tempbio}
                                    onChange={e => { this.setState({ tempbio: e.target.value }) }} />
                                <Button size="lg" onClick={e => { this.setState({ bio: this.state.tempbio }) }}>
                                    Update your Bio
                                </Button> <pre>  </pre>
                                <Button size="lg" onClick={e => {
                                    this.setState({
                                        bio: '',
                                        tempbio: ''
                                    })
                                }}>
                                    Clear your Bio
                                </Button>
                            </p>
                        </div>
                        <div id="applicant_section" style={{ display: "block" }}>
                            <div>
                                <p>
                                    <label><pre>Languages/technologies :  {this.state.languages}</pre></label><br />
                                </p>
                                <p>
                                    <input type="text" placeholder="add languages" value={this.state.addlanguage}
                                        onChange={e => { this.setState({ addlanguage: e.target.value }) }} />
                                    <pre> </pre>
                                    <Button size="sm" onClick={this.handleClick}>
                                        <h3>Add</h3>
                                    </Button>
                                    <Button size="sm" onClick={e => { this.setState({ languages: '' }) }}>
                                        <h3>clear</h3>
                                    </Button>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <label><pre>Education: {edulist}</pre></label>
                                </p>
                                <p><label><pre>Institute name </pre></label>
                                    <input type="text" placeholder="New Institute Name" value={this.state.tempeduname}
                                        onChange={e => { this.setState({ tempeduname: e.target.value }) }} /><br />
                                    <label><pre>Starting Year </pre></label>
                                    <input type="Number" placeholder="Start Date" value={this.state.tempedusdate}
                                        onChange={e => { this.setState({ tempedusdate: e.target.value }) }} /><br />
                                    <label><pre>Ending Year </pre></label>
                                    <input type="Number" placeholder="End Date" value={this.state.tempeduedate}
                                        onChange={e => { this.setState({ tempeduedate: e.target.value }) }} /><br />
                                    <Button size="sm" onClick={this.handleeduClick}>
                                        <h3>Add Institute</h3>
                                    </Button><br />
                                    <label><pre>Enter intitute id to delete that institute </pre></label>
                                    <input type="Number" placeholder="id" value={this.state.deleteedu}
                                        onChange={e => { this.setState({ deleteedu: e.target.value }) }} /> <br />
                                    <Button size="md" onClick={this.handleedudelClick}>
                                        <h3>Delete</h3>
                                    </Button><br />
                                </p>
                            </div>
                        </div>
                        <div>
                            <p>
                                <Button size="md" onClick={this.Savevalue}>
                                    <h3>save changes</h3>
                                </Button><br />
                            </p>
                        </div>
                    </div>
                    <div >
                        <br />
                        <Button style={{ alignSelf: 'center' }} size="sm" value="Signout" onClick={this.OnSignout}>
                            <h3>Sign out</h3>
                        </Button>
                    </div>
                </div></h3>
            </div >
        )
    }
}

export default Profile;