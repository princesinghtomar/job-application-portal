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
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

/* const [value, setValue] = React.useState(JobsList.state.job_type[0]);
const [inputValue, setInputValue] = React.useState(''); */

class JobsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            fuzzyjobs: [],
            query: '',
            logedinuser: '',
            appliedjobs: '',
            min: 0,
            max: 0,
            job_type: ["full_time", "part_time", "work_from_home"],
            duration: ['0', '1', '2', '3', '4', '5', '6', '7'],
            value_job_type: '',
            value_duration: '',
            sortName1: true,
            sortName2: true,
            sortName3: true,
        };

        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeminmax = this.onChangeminmax.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onClickjobbutton = this.onClickjobbutton.bind(this);
        this.buttontext = this.buttontext.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/job')
            .then(response => {
                console.log(response.data)
                this.setState({
                    jobs: response.data.filter(word => (new Date(word.deadline)).getTime() > Date.now()),
                    fuzzyjobs: response.data.filter(word => (new Date(word.deadline)).getTime() > Date.now())
                });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/login')
            .then(response => {
                console.log(response.data)
                this.setState({ logedinuser: response.data });
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

    onChangeSearch(event) {
        var arraytemp = this.state.jobs
        const dat = event.target.value;
        const fuse = new Fuse(arraytemp, { keys: ['email', 'title', 'name'] });
        var data = fuse.search(dat);
        if (event.target.value.length == 0 && this.state.max.length == 0 && this.state.min.length == 0) {
            data = this.state.jobs;
        }
        this.setState({
            fuzzyjobs: data,
            query: event.target.value
        });
        console.log(this.state.fuzzyjobs);
        console.log(this.state.query);
    }

    handleClick(e) {
        e.preventDefault();
        const fuse = new Fuse(this.state.jobs, { keys: ['email', 'title', 'name', 'Job type'] });
        const data = this.state.query ? fuse.search(this.state.query) : this.state.jobs;
        /* this.state.fuzzyjobs = data; */
        this.setState({
            fuzzyjobs: data
        });
        console.log(this.state.fuzzyjobs);
        console.log(this.state.query);
    };

    onClickjobbutton(value) {
        var id = value.title + value.email;
        var d2 = new Date(value.deadline);
        var d3 = d2.getTime();
        console.log(d3);
        console.log(Date.now());
    }

    buttontext(value) {
        const id = value.title + value.email;
        var temp = 0
        if (this.state.appliedjobs.length > 0) {
            var temp = this.state.appliedjobs.filter(word => word.job_id == value._id);
        }
        if (value.max_applicants <= temp.length) {
            console.log("heeloo");
        }
    }

    onChangeminmax(event) {
        console.log("onChangemin")
        var arraytemp = this.state.jobs;
        const min_val = this.state.min;
        const max_val = this.state.max;
        var array = [];
        console.log("hello");
        console.log(this.state.value);
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
        console.log(this.state.fuzzyjobs)
        console.log(this.state.min);
        console.log(event.target.value);
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
        console.log(id);
        console.log(flag);
        /* var flag = this.state.sortName; */
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
        /* if(array.length <= 0){
            array = this.state.jobs;
        } */
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
        if (this.state.query.length == 0 && this.state.max.length == 0 && this.state.min.length == 0) {
            array = this.state.jobs;
        }
        console.log(array);
        console.log(this.state.fuzzyjobs);
        console.log(this.state.query);
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
                                                <TableCell><Button onClick={() => this.onClickjobbutton(job)}>
                                                    <p id={job.title + job.email}>{this.buttontext(job)}</p></Button> </TableCell>
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