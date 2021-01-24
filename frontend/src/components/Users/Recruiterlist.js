import React, { Component } from 'react';
import axios from 'axios';
/* import Fuse from 'fuse.js'; */
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';/* 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment"; */
import moment from 'moment';
import { Link } from 'react-router-dom'/* 
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'; */

class JobsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            fuzzyjobs: [],
            logedinuser: '',
            temp_max_positions: '',
            temp_max_applicants: '',
            temp_deadline: '',
            email: this.props.match.params.id.split('-')[0],
        };
        this.ondelete = this.ondelete.bind(this);
        this.onupdate = this.onupdate.bind(this);
    }

    componentDidMount() {

        axios.get('http://localhost:4000/job')
            .then(response => {
                console.log(response.data);
                console.log(this.state.email);
                this.setState({
                    jobs: response.data.filter(word => (word.email == this.state.email) && (word.status > 0)),
                    fuzzyjobs: response.data.filter(word => (word.email == this.state.email) && (word.status > 0))
                });
                console.log(this.state.jobs);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    ondelete(job, ind) {
        axios.post('http://localhost:4000/job/delete', job)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
    }

    onupdate() {
        document.getElementById("update").style.display = "none";
        document.getElementById("noupdate").style.display = "block";
        const value = this.state.fuzzyjobs;
        console.log(this.state.fuzzyjobs);
        for (var i = 0; i < this.state.fuzzyjobs.length; i++) {
            axios.post('http://localhost:4000/job/update/maxanddeadline', this.state.fuzzyjobs[i])
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: 'center', color: "purple" }}>
                    <h1>Jobs Created by You</h1>
                    <br />
                </div>
                <div>
                    Wanna update some data :  <button style={{ borderRadius: 5, backgroundColor: "#21b6ae" }}
                        onClick={() => {
                            document.getElementById("update").style.display = "block";
                            document.getElementById("noupdate").style.display = "none";
                        }}>update / delete</button>
                    <br />{"Info : Deadline > previous Deadline"}
                    <br />{"And max_positions < max_applicants, "}<br />{"If you put max_positions > max_applicants default value stored is where both are equal"}
                    <br /><br />
                </div>
                <div>
                    <div id="update" style={{ display: "none" }}>
                        <div>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Title</TableCell>
                                                <TableCell>Date of posting</TableCell>
                                                <TableCell>Number of Applicants</TableCell>
                                                <TableCell>Max Applicants</TableCell>
                                                <TableCell>Max positions</TableCell>
                                                <TableCell>Deadline</TableCell>
                                                <TableCell>Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.fuzzyjobs.map((job, ind) => (
                                                <TableRow key={ind}>
                                                    <TableCell>{job.title}</TableCell>
                                                    <TableCell>{moment(job.date_posting).format('LLLL')}</TableCell>
                                                    <TableCell>{job.number_of_applicants}</TableCell>
                                                    <TableCell><TextField value={this.state.temp_max_applicants} label={"current val : " + job.max_applicants} type='Number'
                                                        onChange={e => {
                                                            var array = this.state.fuzzyjobs.map((word, ind1) =>
                                                            (ind === ind1 && e.target.value > 0 && e.target.value < 10000 ? { ...word, max_applicants: e.target.value } : word
                                                            ));
                                                            this.setState({
                                                                fuzzyjobs: array,
                                                                temp_max_applicants: e.target.value
                                                            })
                                                        }}>
                                                    </TextField>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField value={this.state.temp_max_positions} label={"current val : " +  job.max_positions} type='Number'
                                                            onChange={e => {
                                                                var array = this.state.fuzzyjobs.map((word, ind1) =>
                                                                (ind === ind1 && e.target.value > 0 && e.target.value < 10000 ? { ...word, max_positions: e.target.value } : word
                                                                ));
                                                                this.setState({
                                                                    fuzzyjobs: array,
                                                                    temp_max_positions: e.target.value
                                                                })
                                                            }}>
                                                        </TextField>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField value={this.state.temp_deadline} label={"current val : " + job.deadline} type='date'
                                                            onChange={e => {
                                                                var array = this.state.fuzzyjobs;
                                                                if (e.target.value > job.deadline) {
                                                                    array = this.state.fuzzyjobs.map((word, ind1) =>
                                                                        (ind === ind1 && e.target.value > job.deadline ? { ...word, deadline: e.target.value } : word));
                                                                }
                                                                this.setState({
                                                                    fuzzyjobs: array,
                                                                    temp_deadline: e.target.value
                                                                })
                                                            }}>
                                                        </TextField>
                                                    </TableCell>
                                                    <TableCell><button onClick={() => this.ondelete(job, ind)}
                                                        style={{ borderRadius: 5, backgroundColor: "#21b6ae" }}>
                                                        del</button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </div>
                        <div style={{ textAlign: 'center', color: "purple" }}><br /><br />
                            <button style={{ borderRadius: 5, backgroundColor: "#21b6ae" }}
                                onClick={() => this.onupdate()}
                            >Confirm Updates</button>
                        </div>
                    </div>
                    <div id="noupdate" style={{ display: "block" }}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Date of posting</TableCell>
                                            <TableCell>Number of Applicants</TableCell>
                                            <TableCell>Max Applicants</TableCell>
                                            <TableCell>Max positions</TableCell>
                                            <TableCell>Deadline</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.fuzzyjobs.map((job, ind) => (
                                            <TableRow component={Link} to={`/users/jobdashboard/${this.props.match.params.id + '/' + job._id}`} key={ind}>
                                                <TableCell>{job.title}</TableCell>
                                                <TableCell>{moment(job.date_posting).format('LLLL')}</TableCell>
                                                <TableCell>{job.number_of_applicants}</TableCell>
                                                <TableCell>{job.max_applicants}</TableCell>
                                                <TableCell>{job.max_positions}</TableCell>
                                                <TableCell>{moment(job.deadline).format('LLLL')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </div>
                </div>
            </div >
        )
    }
}

export default JobsList;