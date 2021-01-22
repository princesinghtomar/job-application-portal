import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom'
/* import Button from "react-bootstrap/Button";
import "../css/login.css"
import axios from 'axios'; */

export default class Home extends Component {

    constructor(props) {
        super(props);
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
                    <h1>
                        <p style={{ textAlign: 'center', color: "purple" }}>
                            Job Application portal
                        </p>
                    </h1>
                    <hr />
                    <br />
                </div>
                <h3>
                    <div>
                        <p style={{ textAlign: 'center' }}>
                            <pre>Press to Log in: <a href="/login"> Login </a> </pre>
                        </p>
                    </div>
                    <div>
                        <p style={{ textAlign: 'center' }}>
                            <pre>New User! Press to register: <a href="/Register"> Register </a> </pre>
                        </p>
                    </div>
                </h3>
            </div>
        )
    }
}