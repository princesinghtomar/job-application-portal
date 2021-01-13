import React, { Component } from 'react';
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

        axios.post('http://localhost:4000/user/login', newSignin)
            .then(res => { alert("Sign in"); console.log(newSignin) })
            ;

        this.state = {
            email: '',
            password: '',
            motive: ''
        };
    }

    render() {
        return (
            <div>
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Login
                    </h1>
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <label>
                            Email :
                        <input type="text" value={this.state.email} onChange={this.handleEmail} />
                        </label>
                        <br />
                        <label>
                            Password :
                        <input type="password" value={this.state.password} onChange={this.handlePassword} />
                        </label>
                        <br />
                        <label>
                            <select value={this.state.motive} onChange={this.handleDropdown}>
                                <option name="jobapplicant">Job Applicant</option>
                                <option name="recruiter">Recruiter</option>
                            </select>
                        </label>
                        <br />
                        <input type="submit" value="Signin" />
                    </form>
                </div>
            </div>
        )
    }
}