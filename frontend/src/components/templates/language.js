import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

export default class language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: ['']
        }

        this.handleDropdown = this.handleDropdown.bind(this);
    }

    handleDropdown(event) {
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ languages: value });
    }

    render() {
        return (
            <div>
                <Form.Group size="lg" controlId="dropdown">
                    <select multiple={true} value={this.state.language} onChange={this.handleDropdown}>
                        <option value="">Choose Motive</option>
                        <option value="C">C</option>
                        <option value="C++">C++</option>
                        <option value="java">Java</option>
                    </select>
                </Form.Group>
            </div>
        )
    }
}