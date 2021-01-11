import React, { Component } from 'react';
import axios from 'axios';

export default class login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            date: null
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newLogin = {
            email: this.state.email,
            password: this.state.password,
            date: Date.now()
        }
        axios.post('http://localhost:4000/user/login', newLogin)
            .then(res => { console.log(newLogin) })
            ;

        this.setState({
            email: '',
            password: '',
            date: null
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign in" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}