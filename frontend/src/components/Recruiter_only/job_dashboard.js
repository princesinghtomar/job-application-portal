// problem while updating (UI problem)
import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from 'moment';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class JobsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users_applicant: [],
            users_recruiter: [],
            allappliedjobs: [],
            users: '',
            fuzzyjobs: [],
            jobs: [],
            job_id: this.props.match.params.id2,
            recruiter_email: this.props.match.params.id1.split('-')[0],
            needed_user: '',
            sortName1: true,
            sortName2: true,
            sortName3: true,
            gotologin: false
        };

        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.SRbuttontext = this.SRbuttontext.bind(this); ////
        this.buttontext = this.buttontext.bind(this);
        this.onClickRejectbutton = this.onClickRejectbutton.bind(this);
        this.onClickSRbutton = this.onClickSRbutton.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem('email') == null) {
            this.setState({
                gotologin: true
            })
        }
        axios.get('http://localhost:4000/job')
            .then(response => {
                console.log(this.state.job_id);
                console.log(this.state.recruiter_email)
                console.log(response.data)
                this.setState({
                    jobs: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/user')
            .then(response => {
                console.log("heleeelo");
                console.log(response.data[1].username)
                console.log(this.state.recruiter_email);
                console.log(this.props);
                this.setState({
                    /* users_applicant: response.data.find(word => (word.motive == "jobapplicant")),
                    users_recruiter: response.data.filter(word => (word.motive == "recruiter")), */
                    users: response.data
                });
            })
            .catch(function (error) {
                console.log("helloo");
                console.log(error);
            });

        axios.get('http://localhost:4000/jobapplied')
            .then(response => {
                console.log("hello");
                console.log(response.data);
                console.log(this.state.recruiter_email);
                console.log("could find");
                this.setState({
                    appliedjobs: response.data.filter(word => (word.job_id == this.state.job_id) && (word.status > 0)),
                    fuzzyjobs: response.data.filter(word => (word.job_id == this.state.job_id) && (word.status > 0)),
                    allappliedjobs: response.data
                });
            })
            .catch(function (error) {
                console.log("helloo");
                console.log(error);
            });
    }

    SRbuttontext(val) {
        //print Shortlist / Accept
        if (val.status == 0) {
            return <text>Rejected</text>
        }
        else {
            if (val.status == 1) {
                return <text>Shortlist</text>
            }
            else {
                if (val.status == 2) {
                    return <text>Accept</text>
                }
                else {
                    return <text>Accepted</text>
                }
            }
        }
    }

    onClickRejectbutton(val) {
        const temp2 = {
            status: 0,
            required_id: val._id
        }
        if (val.status !== 3) {
            axios.post('http://localhost:4000/jobapplied/updatestatus', temp2)
                .then(res => {
                    window.location.reload();
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    onClickSRbutton(val) {
        var value_status = val.status;
        console.log(val);
        if (val.status == 0) {
            return
        }
        else {
            if (val.status == 1) {
                const temp = {
                    status: 2,
                    required_id: val._id
                }
                axios.post('http://localhost:4000/jobapplied/updatestatus', temp)
                    .then(res => {
                        window.location.reload();
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
            else {
                if (val.status !== 3) {
                    const temp1 = {
                        status: 3,
                        required_id: val._id
                    }
                    axios.post('http://localhost:4000/jobapplied/updatestatus', temp1)
                        .then(res => {
                            console.log(res)
                            console.log("rejectval :");
                            console.log(val._id + ' + ' + val.applicant_email);
                            var rejectval = this.state.allappliedjobs.filter(word => word.applicant_email == val.applicant_email);
                            for (var i = 0; i < rejectval.length; i++) {
                                const tempvariable = {
                                    status: 0,
                                    required_id: rejectval[i]._id
                                }
                                if (rejectval[i]._id !== val._id) {
                                    console.log("Here's our losers");
                                    console.log(rejectval[i]);
                                    axios.post('http://localhost:4000/jobapplied/updatestatus', tempvariable)
                                        .then(res => {
                                            console.log(res);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                            }
                            /* window.location.reload(); */
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }
            }
        }
    }

    buttontext(value) {
        // 0 => rejected
        // 1 => open 
        // 2 => shortlisted
        // 3 => accepted
        if (value.status > 0) {
            if (value.status > 1) {
                if (value.status > 2) {
                    if (value.status > 3) {
                        return <text>Accepted!</text>
                    }
                    else {
                        return <text>Accepted!</text>
                    }
                } else {
                    return <text>Shortlisted!</text>
                }
            }
            else {
                return <text>Open</text>
            }
        }
        else {
            return <text>Rejected</text>
        }
    }

    sortChange(flag, id) {
        /**
         *      Note that this is sorting only at front-end.
         *      id => 1 == Name
         *      id => 2 == Date of application
         *      id => 3 == applicants rating
         */
        var array = this.state.fuzzyjobs;
        var value = this.state.users
        array.sort(function (a, b) {
            if (id === 1) {
                var a_index = -1;
                var b_index = -1;
                for (var i = 0; i < value.length; i++) {
                    if (a.applicant_id == value[i]._id) {
                        a_index = i;
                        break;
                    }
                }
                for (var i = 0; i < value.length; i++) {
                    if (b.applicant_id == value[i]._id) {
                        b_index = i;
                        break;
                    }
                }
                var aname = (value[a_index]).username;
                var bname = (value[b_index]).username;
                console.log(flag ? ('' + aname).localeCompare(bname) : ('' + bname).localeCompare(aname));
                return flag ? ('' + aname).localeCompare(bname) : ('' + bname).localeCompare(aname);
            } else {
                if (id === 2) {
                    console.log("values are here :")
                    console.log(a.date_of_application);
                    console.log(b.date_of_application);
                    return flag ? a.date_of_application - b.date_of_application : b.date_of_application - a.date_of_application;
                } else {
                    //id == 3
                    var a_index = -1;
                    var b_index = -1;
                    for (var i = 0; i < value.length; i++) {
                        if (a.applicant_id == value[i]._id) {
                            a_index = i;
                            break;
                        }
                    }
                    for (var i = 0; i < value.length; i++) {
                        if (b.applicant_id == value[i]._id) {
                            b_index = i;
                            break;
                        }
                    }
                    var arat = (value[a_index]).rating;
                    var brat = (value[b_index]).rating;
                    return flag ? arat - brat : brat - arat;

                }
            }
        });
        if (id === 1) {
            this.setState({
                fuzzyjobs: array,
                sortName1: !this.state.sortName1,
            });
        } else {
            if (id === 2) {
                this.setState({
                    fuzzyjobs: array,
                    sortName2: !this.state.sortName2,
                });
            } else {
                if (id === 3) {
                    this.setState({
                        fuzzyjobs: array,
                        sortName3: !this.state.sortName3,
                    });
                }
            }
        }
    }

    renderIcon(flag) {
        if (flag) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }

    render() {
        if (this.state.gotologin) {
            var id = this.state.id_param;
            console.log(id);
            return <Redirect to={`/login`} />
        }
        const value_render = this.state.fuzzyjobs.map((val, ind) => {
            console.log("hello");
            var temp = this.state.users;
            var needed_index = -1;
            for (var i = 0; i < this.state.users.length; i++) {
                if (val.applicant_id == temp[i]._id) {
                    needed_index = i;
                    break;
                }
            }
            if (needed_index == -1) {
                return <text>User had been deleted from the Database</text>
            }
            console.log(needed_index);

            console.log(temp);
            return (
                <TableRow key={ind}>
                    <TableCell>{temp[needed_index].username}
                    </TableCell>
                    <TableCell>{
                        temp[needed_index].languages}
                    </TableCell>
                    <TableCell>{val.date_of_application}</TableCell>
                    <TableCell>{
                        JSON.stringify(temp[needed_index].education)}
                    </TableCell>
                    <TableCell>{val.sop}</TableCell>
                    <TableCell>{
                        temp[needed_index].rating}
                    </TableCell>
                    <TableCell>
                        {this.buttontext(val)}</TableCell>
                    <TableCell>
                        <button id={val.title + val.email} style={{
                            borderRadius: 5,
                            backgroundColor: "#21b6ae",
                        }}
                            onClick={() => this.onClickSRbutton(val)}>
                            {this.SRbuttontext(val)}
                        </button>
                    </TableCell>
                    <TableCell>
                        <button id={val.title + val.email} style={{
                            borderRadius: 5,
                            backgroundColor: "#21b6ae",
                        }}
                            onClick={() => this.onClickRejectbutton(val)}>
                            <text>Reject</text>
                        </button>
                    </TableCell>
                </TableRow>
            )
        });
        return (
            <div>
                <div>
                    <h6 style={{ textAlign: "right" }}>
                        <a href={"/users/recruiter/" + sessionStorage.getItem('email') + '-' + sessionStorage.getItem('motive') + '/'}>Go to Job Dashboard Page</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href={"/profile/" + sessionStorage.getItem('email') + '-' + sessionStorage.getItem('motive') + '/  '}>Go to main Profile Page</a>
                    </h6><br /><br />
                </div>
                <div>
                    <Grid container spacing={2}>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName1, 1)}>
                                                    {this.renderIcon(this.state.sortName1)}</Button>Name</TableCell>
                                                <TableCell>Skills</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName2, 2)}>
                                                    {this.renderIcon(this.state.sortName2)}</Button>Date of application</TableCell>
                                                <TableCell>Education</TableCell>
                                                <TableCell>Sop</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName3, 3)}>
                                                    {this.renderIcon(this.state.sortName3)}</Button>Rating</TableCell>
                                                <TableCell>Stage</TableCell>
                                                <TableCell>Shortlist/Reject</TableCell>
                                                <TableCell>Reject</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {value_render}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default JobsList;
