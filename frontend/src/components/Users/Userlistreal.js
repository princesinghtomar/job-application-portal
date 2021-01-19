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
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class Userl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            fuzzyusers: [],
            logindata: [],
            query: '',
            min: '',
            max: '',
            sortName1: true,
            sortName2: true,
            sortName3: true,
        };

        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangemin = this.onChangemin.bind(this);
        this.onChangemax = this.onChangemax.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user')
            .then(response => {
                console.log(response.data)
                this.setState({ users: response.data, fuzzyusers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/login')
            .then(response => {
                console.log(response.data)
                this.setState({ logindata: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeSearch(event) {
        var arraytemp = []
        if (event.target.value.length > 0 || this.state.max.length > 0 || this.state.min.length > 0) {
            arraytemp = this.state.fuzzyusers;
        }
        else {
            arraytemp = this.state.users;
        }
        const dat = event.target.value;
        const fuse = new Fuse(arraytemp, { keys: ['email', 'title', 'name'] });
        var data = fuse.search(dat);
        if (event.target.value.length == 0 && this.state.max.length == 0 && this.state.min.length == 0) {
            data = this.state.users;
        }
        this.setState({
            fuzzyusers: data,
            query: event.target.value
        });
        console.log(this.state.fuzzyusers);
        console.log(this.state.query);
    }

    handleClick(e) {
        e.preventDefault();
        const fuse = new Fuse(this.state.users, { keys: ['email', 'title', 'name', 'User type'] });
        const data = this.state.query ? fuse.search(this.state.query) : this.state.users;
        /* this.state.fuzzyusers = data; */
        this.setState({
            fuzzyusers: data
        });
        console.log(this.state.fuzzyusers);
        console.log(this.state.query);
    };

    onChangemin(event) {
        console.log("onChangemin")
        var arraytemp = []
        if (this.state.query.length > 0 || this.state.max.length > 0 || this.state.min.length > 0) {
            arraytemp = this.state.fuzzyusers;
        }
        else {
            arraytemp = this.state.users;
        }
        const min_val = event.target.value;
        var array = [];
        console.log(arraytemp.length);
        if (min_val > 0) {
            for (var i = 0; i < arraytemp.length; i++) {
                if (min_val <= arraytemp[i].salary) {
                    array.push(arraytemp[i]);
                }
            }
        }
        else {
            array = this.state.users;
        }
        if (event.target.value.length == 0 && this.state.query.length == 0 && this.state.min.length == 0) {
            array = this.state.users;
        }
        this.setState({
            min: event.target.value,
            fuzzyusers: array
        });
        console.log(this.state.fuzzyusers)
        console.log(this.state.min);
        console.log(event.target.value);
    }

    onChangemax(event) {
        console.log("onChangemax")
        var arraytemp = []
        if (this.state.query.length > 0 || this.state.min.length > 0 || this.state.max.length > 0) {
            arraytemp = this.state.fuzzyusers;
        }
        else {
            arraytemp = this.state.users;
        }
        const max_val = event.target.value;
        var array = [];
        console.log(arraytemp.length);
        if (max_val > 0) {
            for (var i = 0; i < arraytemp.length; i++) {
                if (max_val >= arraytemp[i].salary) {
                    array.push(arraytemp[i]);
                }
            }
        }
        else {
            array = this.state.users;
        }
        if (event.target.value.length == 0 && this.state.min.length == 0 && this.state.query.length == 0) {
            array = this.state.users;
        }
        this.setState({
            max: event.target.value,
            fuzzyusers: array
        });
        console.log(this.state.fuzzyusers)
        console.log(this.state.max);
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
            array = this.state.fuzzyusers;
        }
        else {
            array = this.state.users;
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
            array = this.state.users;
        } */
        if (id === 1) {
            this.setState({
                fuzzyusers: array,
                sortName1: !this.state.sortName1,
            });
        } else {
            if (id === 2) {
                this.setState({
                    fuzzyusers: array,
                    sortName2: !this.state.sortName2,
                });
            } else {
                if (id === 3) {
                    this.setState({
                        fuzzyusers: array,
                        sortName3: !this.state.sortName3,
                    });
                }
            }
        }
        if (this.state.query.length == 0 && this.state.max.length == 0 && this.state.min.length == 0) {
            array = this.state.users;
        }
        console.log(array);
        console.log(this.state.fuzzyusers);
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
                                    <h3>User Filters</h3>
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
                                            label="Enter Min" fullWidth={true} onChange={this.onChangemin} />
                                        <TextField id="standard-basic" value={this.state.max}
                                            label="Enter Max" fullWidth={true} onChange={this.onChangemax} />
                                    </form>
                                </ListItem>
                                <Divider />
                                <ListItem button divider>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={this.state.users}
                                        getOptionLabel={(option) => option.name}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Space for copy/paster" variant="outlined" />}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={9} lg={9}>
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>id</TableCell>
                                            <TableCell>password</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell><Button onClick={() => this.sortChange(this.state.sortName1, 1)}>
                                                {this.renderIcon(this.state.sortName1)}</Button>Salary</TableCell>
                                            <TableCell><Button onClick={() => this.sortChange(this.state.sortName2, 2)}>
                                                {this.renderIcon(this.state.sortName2)}</Button>Duration</TableCell>
                                            <TableCell><Button onClick={() => this.sortChange(this.state.sortName3, 3)}>
                                                {this.renderIcon(this.state.sortName3)}</Button>Rating</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.fuzzyusers.map((user, ind) => (
                                            <TableRow key={ind}>
                                                <TableCell>{user.id}</TableCell>
                                                <TableCell>{user.password}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.salary}</TableCell>
                                                <TableCell>{user.duration}</TableCell>
                                                <TableCell>{user.rating}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>id</TableCell>
                                            <TableCell>password</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell><Button onClick={() => this.sortChange(this.state.sortName1, 1)}>
                                                {this.renderIcon(this.state.sortName1)}</Button>Salary</TableCell>
                                            <TableCell><Button onClick={() => this.sortChange(this.state.sortName2, 2)}>
                                                {this.renderIcon(this.state.sortName2)}</Button>Duration</TableCell>
                                            <TableCell><Button onClick={() => this.sortChange(this.state.sortName3, 3)}>
                                                {this.renderIcon(this.state.sortName3)}</Button>Rating</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.logindata.map((logs, ind) => (
                                            <TableRow key={ind} >
                                                <TableCell>{logs.id}</TableCell>
                                                <TableCell>{logs.password}</TableCell>
                                                <TableCell>{logs.email}</TableCell>
                                                <TableCell>{logs.salary}</TableCell>
                                                <TableCell>{logs.duration}</TableCell>
                                                <TableCell>{logs.rating}</TableCell>
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

export default Userl;