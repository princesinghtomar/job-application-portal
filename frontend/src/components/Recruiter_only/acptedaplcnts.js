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
            email: this.props.match.params.id.split('-')[0],
            sortName1: true,
            sortName2: true,
            sortName3: true,
            sortName4: true,
            user_rating: new Array(100)
        };

        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/job')
            .then(response => {
                this.setState({
                    jobs: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/user')
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch(function (error) {
                console.log("helloo");
                console.log(error);
            });

        axios.get('http://localhost:4000/jobapplied')
            .then(response => {
                this.setState({
                    appliedjobs: response.data.filter(word => (word.applicant_email == this.state.email) && (word.status > 2)),
                    fuzzyjobs: response.data.filter(word => (word.applicant_email == this.state.email) && (word.status > 2))
                });
            })
            .catch(function (error) {
                console.log("helloo");
                console.log(error);
            });
    }

    sortChange(flag, id) {
        /**
         *      Note that this is sorting only at front-end.
         *      id => 1 == Name
         *      id => 2 == Date of Joining
         *      id => 3 == Job Title
         *      id => 4 == Rating
         */
        var array = this.state.fuzzyjobs;
        array.sort(function (a, b) {
            if (id === 1) {
                var aname = (this.state.users
                    .filter(word => (word._id == a.applicant_id))).name;
                var bname = (this.state.users
                    .filter(word => (word._id == b.applicant_id))).name;
                return flag ? aname - bname : bname - aname;
            } else {
                if (id === 2) {
                    return flag ? a.date_of_joining - b.date_of_joining : b.date_of_joining - a.date_of_joining;
                } else {
                    if (id === 3) {
                        var ajob = (this.state.jobs
                            .filter(word => (word._id == a.job_id))).title
                        var bjob = (this.state.jobs
                            .filter(word => (word._id == b.job_id))).title
                        return flag ? ajob - bjob : bjob - ajob;
                    } else {
                        var arat = (this.state.users
                            .filter(word => (word._id == a.applicant_id))).rating;
                        var brat = (this.state.users
                            .filter(word => (word._id == b.applicant_id))).rating;
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
                    if (id === 5) {
                        this.setState({
                            fuzzyjobs: array,
                            sortName3: !this.state.sortName4,
                        });
                    }
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
        const value_render = this.state.fuzzyjobs.map((val, ind) => {
            var temp1 = (this.state.users
                .find(word => (word._id == val.applicant_id)));
            var temp2 = (this.state.jobs
                .find(word => (word._id == val.job_id)))
            return (
                <TableRow key={ind}>
                    <TableCell>
                        {temp1.name}
                    </TableCell>
                    <TableCell>
                        {val.date_of_joining}
                    </TableCell>
                    <TableCell>
                        {temp2.job_type}
                    </TableCell>
                    <TableCell>
                        {temp2.title}
                    </TableCell>
                    <TableCell>
                        {/* {temp1.rating} */}
                        {
                            <TextField value={this.state.user_rating[ind]} label={temp1.rating} type="Number"
                                onChange={e => {
                                    var array = this.state.users.map((word, ind1) =>
                                    (ind1 === ind && e.target.value > 0 && e.target.value < 6 ? { ...word, rating: e.target.value } : word
                                    ))
                                    this.setState({ jobs: array });
                                }}
                            ></TextField>
                        }
                    </TableCell>
                </TableRow>
            )
        });
        return (
            <div>
                <div style={{ textAlign: "center", color: "Blue" }}>
                    <h1>Accepted Applicants</h1>
                    <br /><br />
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
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName2, 2)}>
                                                    {this.renderIcon(this.state.sortName2)}</Button>Date of Joining</TableCell>
                                                <TableCell>Job-Type</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName3, 3)}>
                                                    {this.renderIcon(this.state.sortName3)}</Button>Job Title</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName4, 4)}>
                                                    {this.renderIcon(this.state.sortName4)}</Button>Rating</TableCell>
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
