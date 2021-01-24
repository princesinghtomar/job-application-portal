import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes, { array } from 'prop-types'
import Form from "react-bootstrap/Form";
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

class Sop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            appliedjobs: [],
            email: this.props.match.params.id.split('-')[0],
            jobs: [],
            job_rating: new Array(100)
        };
        this.onClickjobbutton = this.onClickjobbutton.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:4000/jobapplied')
            .then(response => {
                this.setState({ appliedjobs: response.data.filter(word => (word.applicant_email == this.state.email)) })
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:4000/job')
            .then(response => {
                var result = []
                for (var i = 0; i < this.state.appliedjobs.length; i++) {
                    var value = response.data.filter(word => word._id == this.state.appliedjobs[i].job_id);
                    result.push.apply(result, value);
                }
                console.log(result);
                result = result.filter(function (item, index, inputarray) {
                    return inputarray.indexOf(item) == index;
                });
                console.log(result);
                this.setState({ jobs: result });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onClickjobbutton(value) {
        /* const updateJob = {
            title: value.title,
            email: value.email,
            name: value.name,
            max_applicants: value.max_applicants,
            max_positions: value.max_positions,
            date_posting: value.date_posting,
            deadline: value.deadline,
            required_skills: value.required_skills,
            job_type: value.job_type,
            duration: value.duration,
            salary: value.salary,
            rating: value.rating,
            status: value.status,
            number_of_applicants: value.max_applicants
        } */
        console.log(value)
        axios.post('http://localhost:4000/job/update/rating', value)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });

    }

    render() {
        return (
            <div>
                <div style={{ textAlign: "center", color: "Blue" }}>
                    <h1>My Applications</h1><br />
                </div>
                <div id="warning" style={{ textAlign: "center", color: "red" }}>
                    <br />
                </div>
                <Grid container spacing={2}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>id</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Date of Joining</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>Name of recruiter</TableCell>
                                            <TableCell>Rating</TableCell>
                                            <TableCell>Change Rating</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.jobs.map((job, ind) => (
                                            <TableRow key={ind}>
                                                <TableCell>{ind}</TableCell>
                                                <TableCell>{job.title}</TableCell>
                                                <TableCell>{job.date_of_joining}</TableCell>
                                                <TableCell>{job.salary}</TableCell>
                                                <TableCell>{job.name}</TableCell>
                                                <TableCell>{/* <input value={job.rating} ></input> */}
                                                    <TextField value={this.state.job_rating[ind]} label={job.rating} type="Number"
                                                        onChange={e => {
                                                            var array = this.state.jobs.map((word, ind1) =>
                                                            (ind1 === ind && e.target.value > 0 && e.target.value < 6 ? { ...word, rating: e.target.value } : word
                                                            ))
                                                            this.setState({ jobs: array });
                                                        }}
                                                    ></TextField>
                                                </TableCell>
                                                <TableCell>
                                                    <button id={job._id + job.applicant_email} style={{
                                                        borderRadius: 5,
                                                        backgroundColor: "#21b6ae",
                                                    }}
                                                        onClick={() => this.onClickjobbutton(job)}>
                                                        change</button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

}
export default Sop;