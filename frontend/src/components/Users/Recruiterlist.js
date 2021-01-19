import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from 'moment';
import { Link } from 'react-router-dom'
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class JobsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            fuzzyjobs: [],
            logedinuser: '',
            email: '',
        };
        
    }

    componentDidMount() {
        axios.get('http://localhost:4000/login')
            .then(response => {
                console.log(response.data)
                if (response.data.length > 0) {
                    this.setState({ logedinuser: response.data, email: response.data[0].email });
                }
                else {
                    console.log("User no loged in");
                }
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/job')
            .then(response => {
                console.log(response.data)
                this.setState({
                    jobs: response.data.filter(word => word.email = this.logedinuser.email),
                    fuzzyjobs: response.data.filter(word => word.email = this.logedinuser.email)
                });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/jobapplied')
            .then(response => {
                console.log("hello");
                console.log(response.data)
                this.setState({ appliedjobs: response.data });
            })
            .catch(function (error) {
                console.log("helloo");
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid container>
                        <Grid item xs={12} md={3} lg={3}>
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem>
                                    <h3>Job Filters</h3>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={9} lg={9}>
                            <List component="nav" aria-label="mailbox folders">
                                <TextField
                                    id="standard-basic"
                                    label="Search"
                                    fullWidth
                                    value={this.state.query}
                                    onChange={this.onChangeSearch}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </List>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={3} lg={3}>
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem button>
                                    <form noValidate autoComplete="off">
                                        <label>Salary</label>
                                        <TextField id="standard-basic" value={this.state.min}
                                            label="Enter Min" fullWidth={true} onChange={e => { this.setState({ min: e.target.value }) }} />
                                        <TextField id="standard-basic" value={this.state.max}
                                            label="Enter Max" fullWidth={true} onChange={e => { this.setState({ max: e.target.value }) }} />
                                        <Button sz="md" onClick={this.onChangeminmax} >[Search on min max]</Button>
                                    </form>
                                </ListItem>
                                <Divider />
                                <ListItem button divider>
                                    <Autocomplete
                                        value={this.state.value_job_type}
                                        onChange={(event, value) => {
                                            console.log(value);
                                            var val = this.state.jobs.filter(word => word.job_type == value);
                                            this.setState({
                                                fuzzyjobs: val,
                                                min: '',
                                                max: '',
                                                value_duration: ''
                                            });
                                        }}
                                        id="combo-box-demo"
                                        options={this.state.job_type}
                                        getOptionLabel={(option) => option}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Search Job type" variant="outlined" />}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem button divider>
                                    <Autocomplete
                                        value={this.state.value_duration}
                                        onChange={(event, value) => {
                                            console.log(value);
                                            var val = this.state.jobs.filter(word => word.duration == value);
                                            this.setState({
                                                fuzzyjobs: val,
                                                min: '',
                                                max: '',
                                                value_job_type: ''
                                            });
                                        }}
                                        id="combo-box-demo"
                                        options={this.state.duration}
                                        getOptionLabel={(option) => option}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Search Durantion" variant="outlined" />}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={9} lg={9}>
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Date of posting</TableCell>
                                            <TableCell>Number of Applicants</TableCell>
                                            <TableCell>Max positions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.fuzzyjobs.map((job, ind) => (
                                            <TableRow component={Link} to={`/users/${ind}`} key={ind}>
                                                <TableCell>{job.title}</TableCell>
                                                <TableCell>{job.date_posting}</TableCell>
                                                <TableCell>{job.number_of_applicants}</TableCell>
                                                <TableCell>{job.max_positions}</TableCell>
                                                <TableCell><Button onClick={() => this.onClickjobbutton(job)}>
                                                    <p id={job.title + job.email}>[DELETE]</p></Button> </TableCell>
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

export default JobsList;