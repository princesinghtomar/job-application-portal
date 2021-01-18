import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextInput } from 'react-native';
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
    }

    componentDidMount() {
        axios.get('http://localhost:3000/user')
            .then(response => {
                console.log(response.data);
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div>
                    <Sharedtextarea
                        handleChange={e => { this.setState({ sop: e.target.value }) }}
                    />
                </div>
            </div>
        )
    }

}
export default Sop;