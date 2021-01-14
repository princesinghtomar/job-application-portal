import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/login.css"
import axios from 'axios';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            motive: 'jobapplicant',
            company_name: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeMotive = this.onChangeMotive.bind(this);
        this.onChangeCompany_name = this.onChangeCompany_name.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeMotive(event) {
        this.setState({ motive: event.target.value });
        var temp = event.target.value;
        console.log(temp);
        if (temp == "recruiter") {
            var x = document.getElementById("recruiter_id");
            x.style.display = "block";
        }
        else {
            var x = document.getElementById("recruiter_id");
            x.style.display = "none";
        }
    }

    onChangeCompany_name(event) {
        this.setState({ company_name: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            motive: this.state.motive,
            company_name: this.state.company_name
        }

        var temp = this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.motive.length > 0 &&
            this.state.username.length > 0;

        if (this.state.motive == "recruiter") {
            if (this.state.company_name.length <= 0) {
                temp = false;
            }
        }

        console.log(temp);

        if (temp) {
            /* console.log(this.validateForm) */
            document.getElementById("para_id").innerHTML = "<br/>";
            axios.post('http://localhost:4000/user/login', newUser)
                .then(res => { alert("Signed in"); })
                ;
        }
        else {
            document.getElementById("para_id").innerHTML = "* All Fields" +
                " are Required";
            var temp1 = document.getElementById("para_id").innerHTML;
            console.log(temp1);
        }

        /*  this.setState({
             username: '',
             email: '',
             password: '',
             motive: '',
             company_name: ''
         }); */
    }

    render() {
        return (
            <div>
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Signup
                    </h1>
                </div>
                <div>
                    <p id="para_id" style={{ textAlign: 'center', color: 'red' }}>
                        <br />
                    </p>
                </div>
                <div className="Signup">
                    <form onSubmit={this.onSubmit}>
                        <Form.Group size="lg" controlId="username">
                            <label>
                                Username :
                            </label>
                            <Form.Control autoFocus type="username" value={this.state.username} onChange={this.onChangeUsername} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <label>
                                Email :
                            </label>
                            <Form.Control autoFocus type="email" value={this.state.email} onChange={this.onChangeEmail} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <label>
                                Password :
                            </label>
                            <Form.Control autofocus type="password" value={this.state.password} onChange={this.onChangePassword} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="dropdown">
                            <select value={this.state.motive} onChange={this.onChangeMotive}>
                                <option value="">Choose Motive</option>
                                <option value="recruiter">Recruiter</option>
                                <option value="jobapplicant">Job Applicant</option>
                            </select>
                        </Form.Group>
                        <div id="recruiter_id" style={{ display: "none" }}>
                            <Form.Group size="lg" controlId="after_recruiter">
                                <label> Company Name : </label>
                                <Form.Control type="text" value={this.state.company_name} onChange={this.onChangeCompany_name} />
                            </Form.Group>
                        </div>
                        <Button block size="lg" type="submit" value="Signin">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}