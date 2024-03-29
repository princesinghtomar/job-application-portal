import React, { Component } from 'react';
import axios from 'axios';/* 
import Fuse from 'fuse.js'; */
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';/* 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search"; */
import moment from 'moment';
import { Link } from 'react-router-dom'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class JobsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: '',
            fuzzyjobs: [],
            jobs: [],
            email: this.props.match.params.id1.split('-')[0],
            needed_id: this.props.match.params.id2,
            sortName1: true,
            sortName2: true,
            sortName3: true,
            sortName4: true,
            user_rating: new Array(100),
            gotologin: false
        };

        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.onupdate = this.onupdate.bind(this);
    };

    componentDidMount() {
        if (sessionStorage.getItem('email') == null) {
            this.setState({
                gotologin: true
            })
        }
        axios.get('http://localhost:4000/job')
            .then(response => {
                this.setState({
                    jobs: response.data.filter(word => word.email == this.state.email),
                });
                console.log(this.state.jobs);
            })
            .catch(function (error) {
                console.log("helloo1")
                console.log(error);
            });

        axios.get('http://localhost:4000/user')
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch(function (error) {
                console.log("helloo2");
                console.log(error);
            });

        axios.get('http://localhost:4000/jobapplied')
            .then(response => {
                console.log(this.state.email);
                console.log(response.data);
                var arr = []
                for (var i = 0; i < this.state.jobs.length; i++) {
                    var arrtemp = response.data.filter(word => word.job_id == this.state.jobs[i]._id && word.status > 2);
                    for (var j = 0; j < arrtemp.length; j++) {
                        arr.push(arrtemp[j]);
                    }
                }
                console.log("here");
                /* console.log(arr); */
                this.setState({
                    appliedjobs: arr,
                    fuzzyjobs: arr
                });
                /* console.log(this.state.appliedjobs); */
            })
            .catch(function (error) {
                console.log("helloo3");
                console.log(error);
            });
    }

    sortChange(flag, id) {
        /*
         *      Note that this is sorting only at front-end.
         *      id => 1 == Name
         *      id => 2 == Date of Joining
         *      id => 3 == Job Title
         *      id => 4 == Rating
         */
        var array = this.state.fuzzyjobs;
        var arrayusers = this.state.users;
        var arrayjobs = this.state.jobs;
        console.log(arrayjobs);
        console.log(arrayusers);
        /* console.log("array"); */
        console.log(array);
        array.sort(function (a, b) {
            if (id === 1) {
                var aname = (arrayusers.find(word => (word._id == a.applicant_id))).username;
                var bname = (arrayusers.find(word => (word._id == b.applicant_id))).username;
                console.log(aname + " : " + bname);
                return flag ? ('' + aname).localeCompare(bname) : ('' + bname).localeCompare(aname);
            } else {
                if (id === 2) {
                    return flag ? (new Date(a.date_of_joining)).getTime() - (new Date(b.date_of_joining)).getTime() : (new Date(b.date_of_joining)).getTime() - (new Date(a.date_of_joining)).getTime();
                } else {
                    if (id === 3) {
                        var ajob = (arrayjobs.find(word => (word._id == a.job_id))).title
                        var bjob = (arrayjobs.find(word => (word._id == b.job_id))).title
                        console.log(ajob - bjob);
                        return flag ? ('' + ajob).localeCompare(bjob) : ('' + bjob).localeCompare(ajob);
                    } else {
                        var arat = a.applicant_rating;
                        var brat = b.applicant_rating;
                        console.log(arat + " : " + brat);
                        return flag ? arat - brat : brat - arat;
                    }

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
                } else {
                    if (id === 4) {
                        this.setState({
                            fuzzyjobs: array,
                            sortName4: !this.state.sortName4,
                        });
                    }
                }
            }
        }
    }

    onupdate(value) {
        console.log(value)
        var flag = false;
        axios.post('http://localhost:4000/jobapplied/update/rating', value)
            .then(res => {
                console.log("response :")
                console.log(res);
                flag = !flag;
            })
            .catch(err => {
                console.log(err)
            });
        window.location.reload()
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
            var temp1 = this.state.users
            /* .find(word => (word._id == val.applicant_id))); */
            var user_index = -1;
            var job_index = -1;
            var temp2 = this.state.jobs
            /* .find(word => (word._id == val.job_id))); */
            for (var i = 0; i < temp1.length; i++) {
                if (val.applicant_id == temp1[i]._id) {
                    user_index = i;
                    break;
                }
            }
            for (var i = 0; i < temp2.length; i++) {
                if (val.job_id == temp2[i]._id) {
                    job_index = i;
                    break;
                }
            }
            console.log("here is the value :")
            console.log(temp1);
            console.log(temp2);
            console.log(user_index);
            console.log(job_index);
            return (
                <TableRow key={ind}>
                    <TableCell>
                        {temp1[user_index].username}
                    </TableCell>
                    <TableCell>
                        {val.date_of_joining}
                    </TableCell>
                    <TableCell>
                        {temp2[job_index].job_type}
                    </TableCell>
                    <TableCell>
                        {temp2[job_index].title}
                    </TableCell>
                    <TableCell>
                        {
                            <TextField value={this.state.user_rating[ind]}
                                label={val.applicant_rating}
                                type="Number"
                                onChange={e => {
                                    var array = this.state.fuzzyjobs.map((word, ind1) =>
                                    (ind1 === ind && e.target.value > 0 && e.target.value < 6 ? { ...word, applicant_rating: e.target.value } : word
                                    ))
                                    this.setState({
                                        fuzzyjobs: array,
                                    });
                                    /* if (this.state.showbutton) {
                                        document.getElementById("show_button").style.display = "block"
                                    } */
                                }}>
                            </TextField>
                        }
                    </TableCell>
                    <TableCell>
                        <button style={{
                            borderRadius: 5,
                            backgroundColor: "#21b6ae",
                        }}
                            onClick={() => this.onupdate(val)}>
                            change</button>
                    </TableCell>
                </TableRow>
            )
        });
        return (
            <div>
                <div style={{ textAlign: "center", color: "Blue" }}>
                    <h1>Accepted Applicants</h1>
                    <h6 style={{ textAlign: "right" }}>
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
                                                <TableCell><Button onClick={() => { this.sortChange(this.state.sortName1, 1) }}>
                                                    {this.renderIcon(this.state.sortName1)}</Button>Name</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName2, 2)}>
                                                    {this.renderIcon(this.state.sortName2)}</Button>Date of Joining</TableCell>
                                                <TableCell>Job-Type</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName3, 3)}>
                                                    {this.renderIcon(this.state.sortName3)}</Button>Job Title</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName4, 4)}>
                                                    {this.renderIcon(this.state.sortName4)}</Button>Rating</TableCell>
                                                <TableCell>Change</TableCell>
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
