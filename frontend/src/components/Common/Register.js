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
            motive: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeMotive = this.onChangeMotive.bind(this);
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
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            motive: this.state.motive
        }

        var temp = this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.motive.length > 0 &&
            this.state.username.length > 0;

        if (temp) {
            axios.post('http://localhost:4000/user/register', newUser)
                .then(res => { alert("Created\t" + res.data.username); console.log(newUser) })
                ;
        }

       /*  this.setState({
            username: '',
            email: '',
            password: '',
            motive: ''
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
                        <Button block size="lg" type="submit" value="Signin">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}