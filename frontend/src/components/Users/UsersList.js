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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from 'moment';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class JobsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            fuzzyjobs: [],
            user: [],
            query: '',
            appliedjobs: '',
            appliedjobs_all: '',
            id_param: this.props.match.params.id,
            email: this.props.match.params.id.split('-')[0],
            motive: this.props.match.params.id.split('-')[1],
            min: 0,
            max: 0,
            job_type: ["full_time", "part_time", "work_from_home"],
            value_job_type: '',
            value_duration: '',
            value_title: '',
            sortName1: true,
            sortName2: true,
            sortName3: true,
            sop: '',
            gotologin: false,
            openapplication: 0
        };

        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        /* this.onChangeSearch = this.onChangeSearch.bind(this); */
        this.onChangeminmax = this.onChangeminmax.bind(this);
        /* this.handleClick = this.handleClick.bind(this); */
        this.onClickjobbutton = this.onClickjobbutton.bind(this);
        this.buttontext = this.buttontext.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/job')
            .then(response => {
                console.log("here are all the jobs :");
                console.log(response.data)
                this.setState({
                    jobs: response.data.filter(word => (new Date(word.deadline)).getTime() > Date.now()),
                    fuzzyjobs: response.data.filter(word => (new Date(word.deadline)).getTime() > Date.now())
                });
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
                console.log("here is the all jbob applied ever : ");
                console.log(response.data)
                console.log(this.state.email);
                this.setState({
                    appliedjobs: response.data.filter(word => (word.applicant_email == this.state.email) && (word.status > 0)),
                    appliedjobs_all: response.data
                });
            })
            .catch(function (error) {
                console.log("helloo");
                console.log(error);
            })

        axios.get('http://localhost:4000/user')
            .then(response => {
                console.log("heleeelo");
                console.log(response.data)
                console.log(this.state.email);
                console.log(this.props);
                this.setState({
                    users: response.data.filter(word => (word.email == this.state.email))
                        .filter(word => (word.motive == this.state.motive)),
                });
            })
            .catch(function (error) {
                console.log("helloo");
                console.log(error);
            })
    }

    /* onChangeSearch(event) {
        var arraytemp = this.state.jobs
        const dat = event.target.value;
        const fuse = new Fuse(arraytemp, { keys: ['email', 'title', 'name'] });
        var data = fuse.search(dat);
        if (event.target.value.length == 0 &&
            this.state.max.length == 0 &&
            this.state.min.length == 0) {
            data = this.state.jobs;
        }
        this.setState({
            fuzzyjobs: data,
            query: event.target.value
        });
        console.log(this.state.fuzzyjobs);
        console.log(this.state.query);
    } */

    /* handleClick(e) {
        e.preventDefault();
        const fuse = new Fuse(this.state.jobs, { keys: ['email', 'title', 'name', 'Job type'] });
        const data = this.state.query ? fuse.search(this.state.query) : this.state.jobs;
        //this.state.fuzzyjobs = data;
        this.setState({
            fuzzyjobs: data
        });
        console.log(this.state.fuzzyjobs);
        console.log(this.state.query);
    }; */

    onClickjobbutton(e, value) {
        e.preventDefault();
        var id = value.title + value.email;
        var temp = []
        console.log("applied jobs")
        console.log(this.state.email);
        console.log(this.state.appliedjobs);
        console.log(value);
        if (this.state.appliedjobs_all.length > 0) {
            var val = this.state.appliedjobs.filter(word => word.status == 1);
            if (val.length >= 10) {
                alert("You already have 10 open apllications");
                return;
            } else {
                temp = this.state.appliedjobs_all.filter(word => word.job_id == value._id);
                var max = value.max_applicants;
                var current = temp.length;
                var temp1 = [];
                if (temp.length > 0) {
                    var temp1 = temp.filter(word => (word.applicant_email == this.state.email));
                    if (temp1.length > 0) {
                        return {/* <text style={{ color: 'Green' }}>Applied</text> */ }
                    } else {
                        if (max <= current) {
                            return {/* <text style={{ color: 'Red' }}>Full</text> */ }
                        }
                    }
                }
            }
        }
        var user = this.state.users.filter(word => (word.motive == this.state.motive));
        if (user.length > 0) {
            const enteredName = prompt('Please enter your Statement of Purpose ( SOP )');
            this.setState({
                sop: enteredName,
            })
            if (!enteredName) {
                return;
            }
            if (enteredName.length > 0) {
                var arraydata = enteredName.split(' ');
                if (arraydata.length >= 250) {
                    alert("Total words should be less then 250 words")
                    return;
                }
                var current = temp.length + 1
                console.log("ye h console :");
                console.log(temp);
                console.log(current);
                var temperory = value;
                temperory.number_of_applicants = current;
                console.log(temperory);
                const newjobapplication = {
                    job_id: value._id,
                    applicant_id: user[0]._id,
                    applicant_email: this.state.email,
                    sop: enteredName,
                    status: 1,
                    date_of_application: Date.now()
                }
                axios.post('http://localhost:4000/jobapplied/jobappliedsave', newjobapplication)
                    .then(res => {
                        console.log("created");
                        axios.post('http://localhost:4000/job/update/number_of_applicants', temperory)
                            .then(res => {
                                console.log("updated number of applicants");
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        console.log("here is the changes jobs list :")
                        console.log(value._id);
                        console.log(this.state.jobs);
                    })
                    .catch(err => { console.log(err); });
                 window.location.reload()


            } else {
                return
            }
        } else {
            console.log('121');
            return
        }
    }

    buttontext(value) {
        const id = value.title + value.email;
        var temp = []
        if (this.state.appliedjobs_all.length > 0) {
            temp = this.state.appliedjobs_all.filter(word => word.job_id == value._id);
            var max = value.max_applicants;
            var current = temp.length;
            var temp1 = [];
            if (temp.length > 0) {
                var temp1 = temp.filter(word => (word.applicant_email == this.state.email));
                if (temp1.length > 0) {
                    return <text style={{ color: 'Green' }}>Applied</text>
                }
                else {
                    if (max <= current) {
                        return <text style={{ color: 'Red' }}>Full</text>
                    }
                    else {
                        return <text style={{ color: 'Yellow' }}>Apply</text>
                    }
                }
            }
            else {
                return <text style={{ color: 'Yellow' }}>Apply</text>
            }
        }
        else {
            return <text style={{ color: 'Yellow' }}>apply</text>
        }
    }

    onChangeminmax(event) {
        var arraytemp = this.state.jobs;
        const min_val = this.state.min;
        const max_val = this.state.max;
        var array = [];
        if (min_val > 0 && max_val) {
            for (var i = 0; i < arraytemp.length; i++) {
                if (min_val <= arraytemp[i].salary && max_val >= arraytemp[i].salary) {
                    array.push(arraytemp[i]);
                }
            }
        } else {
            if (max_val > 0) {
                for (var i = 0; i < arraytemp.length; i++) {
                    if (max_val >= arraytemp[i].salary) {
                        array.push(arraytemp[i]);
                    }
                }
            }
            else {
                if (min_val > 0) {
                    for (var i = 0; i < arraytemp.length; i++) {
                        if (min_val <= arraytemp[i].salary) {
                            array.push(arraytemp[i]);
                        }
                    }
                } else {
                    array = this.state.jobs;
                }
            }
        }
        this.setState({
            fuzzyjobs: array,
        });
    }

    sortChange(flag, id) {
        /**
         *      Note that this is sorting only at front-end.
         *      id => 1 == Salary
         *      id => 2 == Duration
         *      id => 3 == Rating
         */
        var array = []
        if (this.state.query.length > 0 || this.state.min.length > 0 || this.state.max.length > 0) {
            array = this.state.fuzzyjobs;
        }
        else {
            array = this.state.jobs;
        }
        array.sort(function (a, b) {
            if (id === 1) {
                return flag ? a.salary - b.salary : b.salary - a.salary;
            } else {
                if (id === 2) {
                    return flag ? a.duration - b.duration : b.duration - a.duration;
                } else {
                    //id == 3
                    return flag ? a.rating - b.rating : b.rating - a.rating;

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
        if (this.state.query.length == 0 &&
            this.state.max.length == 0 &&
            this.state.min.length == 0) {
            array = this.state.jobs;
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
        return (
            <div>
                <div>
                    <h6 style={{ textAlign: "right" }}>
                        <a href={"/profile/" + sessionStorage.getItem('email') + '-' + sessionStorage.getItem('motive')}>Go to main Profile Page</a>
                    </h6>
                </div>
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
                                                label="Enter Min" fullWidth={true} onChange={e => {
                                                    this.setState({ min: e.target.value })
                                                }} />
                                            <TextField id="standard-basic" value={this.state.max}
                                                label="Enter Max" fullWidth={true} onChange={e => {
                                                    this.setState({ max: e.target.value })
                                                }} />
                                            <Button sz="md" onClick={this.onChangeminmax} >
                                                [Search on min max]</Button>
                                        </form>
                                    </ListItem>
                                    <Divider />
                                    <ListItem button divider>
                                        <Autocomplete
                                            value={this.state.value_job_type}
                                            onChange={(event, value) => {
                                                console.log(value);
                                                var val;
                                                if (value !== null) {
                                                    val = this.state.jobs.filter(word => word.job_type == value);
                                                } else {
                                                    val = this.state.jobs;
                                                }
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
                                        <InputLabel htmlFor="outlined-age-native-simple">Duration</InputLabel>
                                        <Select
                                            native
                                            value={this.state.value_duration}
                                            onChange={(event) => {
                                                var val;
                                                if (event.target.value !== null) {
                                                    val = this.state.jobs.filter(word => word.duration < event.target.value);
                                                } else {
                                                    val = this.state.jobs;
                                                }
                                                this.setState({
                                                    fuzzyjobs: val,
                                                    min: '',
                                                    max: '',
                                                    value_job_type: ''
                                                });
                                            }}
                                            label="Duration"
                                            inputProps={{
                                                name: 'duration',
                                                id: 'outlined-age-native-simple',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>

                                        </Select>
                                    </ListItem>
                                    <Divider />
                                    <ListItem button divider>
                                        <Autocomplete
                                            value={this.state.value_title}
                                            onChange={(event, value) => {
                                                console.log(value);
                                                var val;
                                                if (value !== null) {
                                                    val = this.state.jobs.filter(word => word.title == value.title);
                                                } else {
                                                    val = this.state.jobs
                                                }
                                                //console.log(val);
                                                this.setState({
                                                    fuzzyjobs: val,
                                                    min: '',
                                                    max: '',
                                                    value_job_type: ''
                                                });
                                                //console.log(this.state.fuzzyjobs);
                                            }}
                                            id="combo-box-demo"
                                            options={this.state.jobs}
                                            getOptionLabel={(option) => option.title}
                                            style={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Search Title" variant="outlined" />}
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
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName1, 1)}>
                                                    {this.renderIcon(this.state.sortName1)}</Button>Salary</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName2, 2)}>
                                                    {this.renderIcon(this.state.sortName2)}</Button>Duration</TableCell>
                                                <TableCell><Button onClick={() => this.sortChange(this.state.sortName3, 3)}>
                                                    {this.renderIcon(this.state.sortName3)}</Button>Rating</TableCell>
                                                <TableCell>Deadline</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.fuzzyjobs.map((job, ind) => (
                                                <TableRow key={ind}>
                                                    <TableCell>{job.title}</TableCell>
                                                    <TableCell>{job.name}</TableCell>
                                                    <TableCell>{job.email}</TableCell>
                                                    <TableCell>{job.salary}</TableCell>
                                                    <TableCell>{job.duration}</TableCell>
                                                    <TableCell>{job.rating}</TableCell>
                                                    <TableCell>{moment(job.deadline).format('LLLL')}</TableCell>
                                                    <TableCell>
                                                        <button id={job.title + job.email} style={{
                                                            borderRadius: 5,
                                                            backgroundColor: "#21b6ae",
                                                        }}
                                                            onClick={(e) => this.onClickjobbutton(e, job)}>
                                                            {this.buttontext(job)}</button></TableCell>
                                                </TableRow>
                                            ))}
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