import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
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
            appliedjobs: [],    // not accepted jobs
            acceptedappliedjobs: [],
            email: this.props.match.params.id.split('-')[0],
            ratedusers: [],
            jobs: [],
            otherjobs: [],
            gotologin: false,
            job_rating: new Array(100),
        };
        this.onClickjobbutton = this.onClickjobbutton.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user')
            .then(response => {
                this.setState({ users: response.data });
                if (sessionStorage.getItem('email') == null) {
                    this.setState({
                        gotologin: true
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:4000/jobapplied')
            .then(response => {
                this.setState({
                    appliedjobs: response.data.filter(word => ((word.applicant_email == this.state.email) && (word.status < 3))),
                    acceptedappliedjobs: response.data.filter(word => ((word.applicant_email == this.state.email) && (word.status == 3)))
                })
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:4000/job')
            .then(response => {
                var result1 = []
                for (var i = 0; i < this.state.appliedjobs.length; i++) {
                    var value = response.data.filter(word => word._id == this.state.appliedjobs[i].job_id);
                    result1.push.apply(result1, value);
                }
                console.log(result1);
                result1 = result1.filter(function (item, index, inputarray) {
                    return inputarray.indexOf(item) == index;
                });
                var result = []
                for (var i = 0; i < this.state.acceptedappliedjobs.length; i++) {
                    var value = response.data.filter(word => word._id == this.state.acceptedappliedjobs[i].job_id);
                    result.push.apply(result, value);
                }
                console.log(result);
                result = result.filter(function (item, index, inputarray) {
                    return inputarray.indexOf(item) == index;
                });
                console.log(result1);
                this.setState({
                    jobs: result,
                    otherjobs: result1
                });
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
        var temp = this.state.acceptedappliedjobs.find(word => word.job_id == value._id);
        console.log("something is here");
        console.log(value)
        console.log(temp);
        if (temp !== null) {
            axios.post('http://localhost:4000/jobapplied/update/rating', temp)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                });
        }

    }

    render() {
        if (this.state.gotologin) {
            var id = this.state.id_param;
            console.log(id);
            return <Redirect to={`/login`} />
        }
        return (
            <div>
                <div style={{ textAlign: "center", color: "Blue" }}>
                    <h1>My Applications</h1>
                    <h6 style={{ textAlign: "right" }}>
                        <a href={"/profile/" + sessionStorage.getItem('email') + '-' + sessionStorage.getItem('motive')}>Go to main Profile Page</a>
                    </h6>
                    <br />
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
                                                <TableCell>{job.title}</TableCell>
                                                <TableCell>{job.date_of_joining}</TableCell>
                                                <TableCell>{job.salary}</TableCell>
                                                <TableCell>{job.name}</TableCell>
                                                <TableCell>
                                                    <TextField value={this.state.job_rating[ind]}
                                                        label={this.state.acceptedappliedjobs.find(word => word.job_id == job._id).recruiter_rating}
                                                        type="Number"
                                                        onChange={e => {
                                                            var array = this.state.acceptedappliedjobs.map((word, ind1) =>
                                                            (word.job_id == job._id && e.target.value > 0 && e.target.value < 6 ? { ...word, recruiter_rating: e.target.value } : word
                                                            ))
                                                            this.setState({ acceptedappliedjobs: array });
                                                        }}
                                                    ></TextField>
                                                </TableCell>
                                                <TableCell>
                                                    <button id={job._id + job.applicant_email} style={{
                                                        borderRadius: 5,
                                                        backgroundColor: "#21b6ae",
                                                    }}
                                                        onClick={() => this.onClickjobbutton(job)}>
                                                        change</button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {this.state.otherjobs.map((job, ind) => (
                                            <TableRow key={ind}>
                                                <TableCell>{job.title}</TableCell>
                                                <TableCell>{job.date_of_joining}</TableCell>
                                                <TableCell>{job.salary}</TableCell>
                                                <TableCell>{job.name}</TableCell>
                                                <TableCell>
                                                    {job.rating}
                                                </TableCell>
                                                <TableCell>
                                                    [NOT ACCEPTED]</TableCell>
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