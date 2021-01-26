import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import "../css/login.css"
import Language from "../templates/language"
import axios from 'axios';

export default class newjobregister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            email: this.props.match.params.id.split('-')[0],
            name: '',
            max_applicants: 1,
            max_positions: 1,
            date_posting: '',
            deadline: '',
            required_temp: '',
            required_skills: '',//this is giving some problem check it okay inheritence and composition
            job_type: '',
            duration: '',
            salary: '',
            rating: '',
            status: 1,  //0 -> open , 1 -> over
            buttonstate: true
        }
        this.handleClick = e => {
            e.preventDefault();
            var temp = this.state.required_skills + ' ';
            temp = temp + ' ' + this.state.required_temp;
            this.state.required_skills = temp
            console.log(this.state.required_skills);
            console.log(this.state.required_temp);
            console.log(temp)
            document.getElementById("inputrskills").innerHTML = temp;
            this.state.required_temp = '';
            this.setState({ buttonstate: !this.state.buttonstate });
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMax_applicants = this.onChangeMax_applicants.bind(this);
        this.onChangeMax_positions = this.onChangeMax_positions.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeRequired_skills = this.onChangeRequired_skills.bind(this);
        this.onChangeJob_type = this.onChangeJob_type.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem('email') == null) {
            this.setState({
                gotologin: true
            })
        }
    }

    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeMax_applicants(event) {
        var temp = event.target.value;
        if (temp < 1) {
            temp = 1;
        }
        this.setState({ max_applicants: temp });
    }

    onChangeMax_positions(event) {
        var temp = event.target.value;
        if (temp < 1) {
            temp = 1;
        }
        this.setState({ max_positions: temp });
    }

    onChangeDeadline(event) {

        this.setState({ deadline: event.target.value })
    }

    onChangeRequired_skills(event) {
        this.state.required_temp = event.target.value;
        this.setState({ required_temp: event.target.value })
    }

    handleClick(event) {
        var temp = this.state.required_skills + ' ';
        temp = temp + ' ' + this.state.required_temp;
        console.log(this.required_skills);
        console.log(this.required_temp);
        console.log(temp)
        document.getElementById("inputrskills").innerHTML = temp;

    }

    onChangeJob_type(event) {
        this.setState({ job_type: event.target.value })
    }

    onChangeDuration(event) {
        var temp = event.target.value;
        if (temp >= 0 && temp <= 7) {
            this.setState({ duration: temp })
            return;
        }
    }

    onChangeSalary(event) {
        var temp = event.target.value;
        if (temp < 0) {
            temp = 0;
        }
        this.setState({ salary: temp })
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(this.state.required_skills);

        const newJob = {
            title: this.state.title,
            email: this.props.match.params.id.split('-')[0],
            name: this.state.name,
            max_applicants: parseInt(this.state.max_applicants),
            required_skills: this.state.required_skills.trim(),
            max_positions: parseInt(this.state.max_positions),
            date_posting: new Date(Date.now()),
            deadline: this.state.deadline,
            job_type: this.state.job_type,
            duration: this.state.duration,
            salary: this.state.salary,
            rating: this.state.rating,
            status: 1
        }
        console.log("newJob")
        console.log(newJob)

        var temp = this.state.email.length > 0 &&
            this.state.name.length > 0 &&
            this.state.title.length > 0 &&
            parseInt(this.state.max_applicants) > 0 &&
            parseInt(this.state.max_positions) > 0 &&
            this.state.deadline.length > 0 &&
            parseInt(this.state.salary) >= 0 &&
            this.state.required_skills.length > 0 &&
            this.state.job_type.length > 0 &&
            parseInt(this.state.duration) >= 0;

        if (!temp) {
            document.getElementById('para_id').innerHTML = "" +
                " * All fields are necessary"
            return;
        }
        else {
            var temperary1 = parseInt(this.state.max_applicants) >= parseInt(this.state.max_positions);
            var temperary2 = (new Date(this.state.deadline).getTime() > Date.now())
            if (!temperary1) {
                document.getElementById('para_id').innerHTML = "" +
                    "* Max Applicants >= Max positions (check this)"
                return;
            } else {
                if (!temperary2) {
                    document.getElementById('para_id').innerHTML = "" +
                        "* Check your Deadline"
                    return;
                }
                else {
                    document.getElementById('para_id').innerHTML = "<br/>"
                }
            }
        }

        if (temp) {
            axios.post('http://localhost:4000/job/newjob', newJob)
                .then(res => {
                    /* alert("Created\t" + res.data.title); */
                    console.log("newJob");
                    console.log(newJob);
                    console.log("res");
                    console.log(res);
                })
                .catch(err => { console.log(err) })
                ;
            window.location.reload()
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
                    <h1 style={{ textAlign: "center" }}>
                        Enter Job Details
                    </h1>
                    <h6 style={{ textAlign: "right" }}>
                        <a href={"/profile/" + sessionStorage.getItem('email') + '-' + sessionStorage.getItem('motive')}>Go to main Profile Page</a>
                    </h6>
                </div>
                <div>
                    <h5>
                        <p id="para_id" style={{ textAlign: 'center', color: 'red' }}>
                            <br />
                        </p>
                    </h5>
                </div>
                <div className="Signup">
                    <form onSubmit={this.onSubmit}>
                        <Form.Group size="lg" controlId="title">
                            <Form.Label>
                                Job Title :
                            </Form.Label>
                            <Form.Control autoFocus type="text" value={this.state.title}
                                onChange={this.onChangeTitle} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>
                                Your Email :
                            </Form.Label>
                            <Form.Control autoFocus type="email" value={this.state.email}
                                /* onChange={this.onChangeEmail}  */ />
                        </Form.Group>
                        <Form.Group size="lg" controlId="name">
                            <Form.Label>
                                Your Name :
                            </Form.Label>
                            <Form.Control autoFocus type="text" value={this.state.name}
                                onChange={this.onChangeName} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="name">
                            <Form.Label>
                                Rating :
                            </Form.Label>
                            <Form.Control autoFocus type="number" value={this.state.rating}
                                onChange={e => {
                                    var temp = 4;
                                    if (e.target.value > 5) {
                                        temp = 5
                                    } else {
                                        if (e.target.value < 1) {
                                            temp = 1
                                        }
                                        else {
                                            temp = e.target.value
                                        }
                                    }
                                    this.setState({ rating: temp });
                                }
                                } />
                        </Form.Group>
                        <Form.Group size="lg" controlId="max_applicants">
                            <Form.Label>
                                Max Applicants :
                            </Form.Label>
                            <Form.Control autoFocus type="number" value={this.state.max_applicants}
                                onChange={this.onChangeMax_applicants} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="max_positions">
                            <Form.Label>
                                Max Positions :
                            </Form.Label>
                            <Form.Control autoFocus type="number" value={this.state.max_positions}
                                onChange={this.onChangeMax_positions} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="deadline">
                            <Form.Label>
                                Deadline of filling the form :
                            </Form.Label>
                            <Form.Control autoFocus type="date" value={this.state.deadline}
                                onChange={this.onChangeDeadline} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="requiredskills">
                            <Form.Label>
                                Required Skills :
                            </Form.Label>
                            <div><p id="inputrskills"><br /></p></div>
                            <Form.Control autoFocus type="text" value={this.state.required_temp}
                                onChange={this.onChangeRequired_skills} />
                            <br />
                            <Button block size="md" onClick={this.handleClick}>
                                Add languages / technologies
                            </Button>
                        </Form.Group>
                        <Form.Group size="lg" controlId="dropdown_list">
                            <select value={this.state.job_type} onChange={this.onChangeJob_type}>
                                <option value="">Job Type</option>
                                <option value="full_time">Full Time</option>
                                <option value="part_time">Part Time</option>
                                <option value="work_from_home">Work from Home</option>
                            </select>
                        </Form.Group>
                        <Form.Group size="lg" controlId="duration">
                            <Form.Label>
                                {"Duration (in months) (0 <= value <= 7) :"}
                            </Form.Label>
                            <Form.Control autoFocus type="Number" value={this.state.duration}
                                onChange={this.onChangeDuration} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="salary">
                            <Form.Label>
                                Salary :
                            </Form.Label>
                            <Form.Control autoFocus type="number" value={this.state.salary}
                                onChange={this.onChangeSalary} />
                        </Form.Group>
                        <Button block size="lg" type="submit" value="Signin">
                            Post
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}