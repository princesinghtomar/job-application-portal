import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [{ _id: 1, username: "", email: "" }],
            logedin_user: [{ _id: 1, email: "loading" }],
            username: 'heklo',
            tempusername: 'helko',
            languages: 'c++',
            addlanguage: '',
            rating: '4',
            education: [{ "id": '0', "name": '', "sdate": '', "edate": '' }],
            tempeduname: 'Education Intitute',
            tempedusdate: '',
            tempeduedate: '',
        };

        this.OnSignout = this.OnSignout.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleeduClick = this.handleeduClick.bind(this);
        this.handleedudelClick = this.handleedudelClick.bind(this);
        this.updateusername = this.updateusername.bind(this);
        this.OnhandleClick = this.OnhandleClick.bind(this);
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
            })
    }

    onChangeusername(event) {
        this.setState({ tempusername: event.target.value });
    }

    handleClick(event) {
        var temp = this.state.languages + ' ' + this.state.addlanguage;
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
        var logeduser = this.state.logedin_user;
        var alluser = this.state.users;
        console.log(
            logeduser.email == alluser[3].email &&
            logeduser.password == alluser[3].password &&
            logeduser.motive == alluser[3].motive)
        for (var i = 0; i < alluser.length; i++) {
            if (logeduser.email == alluser[i].email &&
                logeduser.password == alluser[i].password &&
                logeduser.motive == alluser[i].motive
            ) {
                this.setState({ username: alluser.username });
                document.getElementById("showornot").style.display = "block";
                return;
            }
        }
        document.getElementById("para_id").innerHTML = "" +
            "There is some ambiguity log data and users data (# matching failed)"
        return;
    }

    OnhandleClick(event) {
        document.getElementById("okay1").style.display = "none";
        document.getElementById("showornot").style.display = "block";
        this.updateusername();

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
            <div>
                <div id="okay1" style={{ display: "block" }}>
                    <Button size="lg" onClick={this.OnhandleClick}>
                        Click to see Profile
                    </Button>
                </div>
                <div id="showornot" style={{ display: "none" }}>
                    <div className="Start">
                        <h1 style={{ textAlign: "center" }}>
                            Profile{this.updateusername}
                        </h1>
                    </div>
                    <div>
                        <p style={{ textAlign: "center", color: "red" }} id="para_id">
                            <br />
                        </p>
                    </div>
                    <div>
                        <p>
                            <label><pre >UserName :  {this.state.username}</pre></label><br />
                        </p>
                        <p>
                            <input type="text" value={this.state.tempusername} name="Username"
                                onChange={this.onChangeusername} />
                        </p>
                        <p>
                            <label><pre>Languages/technologies :  {this.state.languages}</pre></label><br />
                        </p>
                        <p>
                            <input type="text" value={this.state.addlanguage}
                                onChange={e => { this.setState({ addlanguage: e.target.value }) }} />
                            <pre> </pre>
                            <Button size="sm" onClick={this.handleClick}>
                                Add
                            </Button>
                        </p>
                        <p>
                            <label><pre >Rating :  {this.state.rating}</pre></label>
                        </p>
                        <p>
                            <label><pre>Education: {edulist}</pre></label>
                        </p>
                        <p><label><pre>Institute name </pre></label>
                            <input type="text" value={this.state.tempeduname}
                                onChange={e => { this.setState({ tempeduname: e.target.value }) }} /><br />
                            <label><pre>Starting Year </pre></label>
                            <input type="Number" value={this.state.tempedusdate}
                                onChange={e => { this.setState({ tempedusdate: e.target.value }) }} /><br />
                            <label><pre>Ending Year </pre></label>
                            <input type="Number" value={this.state.tempeduedate}
                                onChange={e => { this.setState({ tempeduedate: e.target.value }) }} /><br />
                            <Button size="sm" onClick={this.handleeduClick}>
                                Add
                            </Button><br />
                            <label><pre>Enter intitute id to delete that institute </pre></label>
                            <input type="Number" value={this.state.deleteedu}
                                onChange={e => { this.setState({ deleteedu: e.target.value }) }} /> <br />
                            <Button size="md" onClick={this.handleedudelClick}>
                                Delete
                            </Button><br />
                        </p>
                    </div>
                    <div ><br />
                        <Button style={{ alignSelf: 'center' }} size="sm" value="Signout" onClick={this.OnSignout}>
                            Sign out
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;