import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/login.css"
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

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    onSubmit(event) {
        event.preventDefault();

        const newSignin = {
            email: this.state.email,
            password: this.state.password,
            motive: this.state.motive
        }

        axios.post('http://localhost:4000/user/login', newSignin)
            .then(res => { alert("Signed in"); console.log(newSignin) })
            ;

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
                        <label>
                            <select value={this.state.motive} onChange={this.handleDropdown}>
                                <option name="jobapplicant">Job Applicant</option>
                                <option name="recruiter">Recruiter</option>
                            </select>
                        </label>
                        <Button block size="lg" type="submit" value="Signin" disabled={!this.validateForm}>
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}