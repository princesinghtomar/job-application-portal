import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import "../css/signup.css"
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            motive: '',
            company_name: '',
            gotoprofile: false
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleCompany_name = this.handleCompany_name.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    handleEmail(event) {
        this.setState({ email: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleDropdown(event) {
        this.setState({ motive: event.target.value });
        var temp = event.target.value;
        console.log(temp);
        var xi;
        if (temp == "recruiter") {
            xi = document.getElementById("recruiter_id");
            xi.style.display = "block";
        }
        else {
            xi = document.getElementById("recruiter_id");
            xi.style.display = "none";
        }
    }

    handleCompany_name(event) {
        this.setState({ company_name: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        const newSignin = {
            email: this.state.email,
            password: this.state.password,
            motive: this.state.motive,
            company_name: this.state.company_name
        }
        console.log(this.state.email.length);
        console.log(this.state.password.length);
        console.log(this.state.motive.length);
        console.log(this.state.company_name.length);

        var temp = this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.motive.length > 0;

        if (this.state.motive == "recruiter") {
            if (this.state.company_name.length <= 0) {
                temp = false;
            }
        }

        console.log(temp);

        if (temp) {
            document.getElementById("para_id").innerHTML = "<br/>";
            axios.post('http://localhost:4000/user/login', newSignin)
                .then(res => { 
                    this.setState({gotoprofile:true});
                })
                .catch(err => { console.log(err); });
        }
        else {
            document.getElementById("para_id").innerHTML = "* Please Enter" +
                " Correct credentials";
            var temp1 = document.getElementById("para_id").innerHTML;
            console.log(temp1);
        }

        /* this.setState({
            email: '',
            password: '',
            motive: '',
            company_name: ''
        }); */
    }

    render() {
        if(this.state.gotoprofile){
            var id = this.state.email + '-' + this.state.motive;
            console.log(id);
            return <Redirect to={`/profile/${id}`} />
        }
        return (
            <div>
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Login
                    </h1>
                </div>
                <div>
                    <h4>
                        <p id="para_id" style={{ textAlign: 'center', color: 'red' }}>
                            <br />
                        </p>
                    </h4>
                </div>
                <div className="Login">
                    <form onSubmit={this.onSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <label>
                                Email :
                        </label>
                            <Form.Control autoFocus type="email" value={this.state.email}
                                onChange={this.handleEmail} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <label>
                                Password :
                            </label>
                            <Form.Control type="password" value={this.state.password}
                                onChange={this.handlePassword} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="dropdown">
                            <select value={this.state.motive} onChange={this.handleDropdown}>
                                <option value="">Choose Motive</option>
                                <option value="recruiter">Recruiter</option>
                                <option value="jobapplicant">Job Applicant</option>
                            </select>
                        </Form.Group>
                        <div id="recruiter_id" style={{ display: "none" }}>
                            <Form.Group size="lg" controlId="after_recruiter">
                                <label> Company Name : </label>
                                <Form.Control type="text" value={this.state.company_name} onChange={this.handleCompany_name} />
                            </Form.Group>
                        </div>
                        <Button block size="lg" type="submit" value="Signin" >
                            Login
                        </Button>
                    </form>
                </div>
            </div >
        )
    }
}