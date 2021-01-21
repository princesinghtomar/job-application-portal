import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Sharedtextarea from "../templates/sharedtextarea"

class Sop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            job_id: '',
            user_id: '',
            sop: ''
        };
        this.onClickfunction = this.onClickfunction.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user')
            .then(response => {
                console.log(response.data);
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        //redirected page with document id which you had to store in the database
    }

    onClickfunction() {
        console.log(this.state.sop);
        var value = this.state.sop.split(" ");
        if (value.length > 250) {
            document.getElementById("warning").innerHTML = "" +
                "Word limit is 250 words"
            return;
        }
        const newappliedjob = {
            job_id: this.state.job_id,
            applicant_id: this.state.user_id,
            applicant_emai: this.state.user_email,
            sop: this.state.sop
        }
        axios.post('http://localhost:4000/jobappliedsave')
            .then(() => { console.log('Resolved 1') })
            .catch(() => { console.log('Rejected 1') })
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: "center", color: "Blue" }}>
                    <h1>Enter your Statement of Purpose</h1><br />
                </div>
                <div id="warning" style={{ textAlign: "center", color: "red" }}>
                    <br />
                </div>
                <div>
                    <Sharedtextarea
                        handleChange={e => { this.setState({ sop: e.target.value }) }}
                    />
                </div>
                <br></br>
                <div>
                    <Button size="lg" onClick={this.onClickfunction}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }

}
export default Sop;