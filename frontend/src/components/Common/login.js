import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/signup.css"
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            motive: ''
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
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
    }

    onSubmit(event) {
        event.preventDefault();

        const newSignin = {
            email: this.state.email,
            password: this.state.password,
            motive: this.state.motive
        }
        console.log(this.state.email.length);
        console.log(this.state.password.length);
        console.log(this.state.motive.length);

        var temp = this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.motive.length > 0;

        console.log(temp);

        if (temp) {
            /* console.log(this.validateForm) */
            axios.post('http://localhost:4000/user/login', newSignin)
                .then(res => { alert("Signed in"); })
                ;
        }

        this.setState({
            email: '',
            password: '',
            motive: ''
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Login
                    </h1>
                </div>
                <div className="Login">
                    <form onSubmit={this.onSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <label>
                                Email :
                        </label>
                            <Form.Control autoFocus type="email" value={this.state.email} onChange={this.handleEmail} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <label>
                                Password :
                            </label>
                            <Form.Control type="password" value={this.state.password} onChange={this.handlePassword} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="dropdown">
                            <select value={this.state.motive} onChange={this.handleDropdown}>
                                <option value="">Choose Motive</option>
                                <option value="recruiter">Recruiter</option>
                                <option value="jobapplicant">Job Applicant</option>
                            </select>
                        </Form.Group>
                        <Button block size="lg" type="submit" value="Signin" >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}