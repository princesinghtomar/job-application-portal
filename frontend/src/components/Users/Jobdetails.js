import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import ReactTable from "react-table";
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
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class Jobdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            logindata: [],
            fuzzyjobs: [],
            jobs: [],
            jobsappied: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/jobapplied')
            .then(response => {
                console.log(response.data);
                this.setState({ jobsappied: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/user')
            .then(response => {
                console.log(response.data)
                this.setState({ users: response.data });
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

        axios.get('http://localhost:4000/login')
            .then(response => {
                console.log(response.data);
                this.setState({
                    jobs: response.data,
                    fuzzyjobs: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (<div>
            <div>

            </div>
            <div>
                <Grid container spacing={2}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>id</TableCell>
                                            <TableCell>password</TableCell>
                                            <TableCell>Email</TableCell>
                                            {/* <TableCell><Button onClick={() => this.sortChange(this.state.sortName1, 1)}>
                                                {this.renderIcon(this.state.sortName1)}</Button>Salary</TableCell>
                                            <TableCell><Button onClick={() => this.sortChange(this.state.sortName2, 2)}>
                                                {this.renderIcon(this.state.sortName2)}</Button>Duration</TableCell>
                                            <TableCell><Button onClick={() => this.sortChange(this.state.sortName3, 3)}>
                                                {this.renderIcon(this.state.sortName3)}</Button>Rating</TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.jobs.map((logs, ind) => (
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
        </div>
        )
    };
}
export default Jobdetails;