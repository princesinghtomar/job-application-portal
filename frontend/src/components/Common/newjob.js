import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/login.css"
import Language from "../templates/language"
import axios from 'axios';

export default class newjobregister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            email: '',
            name: '',
            max_applicants: '',
            max_positions: '',
            date_posting: '',
            deadline: '',
            required_skills: [''],//this is giving some problem check it okay inheritence and composition
            job_type: '',
            duration: '',
            salary: '',
            rating: '',
            status: true
        }

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
        this.setState({ required_skills: Language.Components.languages })
    }

    onChangeJob_type(event) {
        this.setState({ job_type: event.target.value })
    }

    onChangeDuration(event) {
        var temp = event.target.value;
        temp = temp>0?temp:1;
        this.setState({ duration: temp })
    }

    onChangeSalary(event) {
        var temp = event.target.value;
        if(temp<0){
            temp = 0;
        }
        this.setState({ salary: temp })
    }

    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            title: this.state.title,
            email: this.state.email,
            name: this.state.name,
            max_applicants: this.state.max_applicants,
            max_positions: this.state.max_positions,
            date_posting: Date.now(),
            deadline: this.state.deadline,
            required_skills: this.state.required_skills,
            job_type: this.state.job_type,
            duration: this.state.duration,
            salary: this.state.salary,
            rating: '4',
            status: true
        }

        console.log(newJob)

        /*var temp = this.state.email.length > 0 &&
            this.state.name.length > 0 &&
            this.state.title.length > 0;

        if (temp) {
            axios.post('http://localhost:4000/user/register', newJob)
                .then(res => { alert("Created\t" + res.data.title); console.log(newJob) })
                ;
        } */
    }

    render() {
        return (
            <div>
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Enter Job Details
                    </h1>
                </div>
                <div className="Signup">
                    <form onSubmit={this.onSubmit}>
                        <Form.Group size="lg" controlId="title">
                            <Form.Label>
                                Job Title :
                            </Form.Label>
                            <Form.Control autoFocus type="title" value={this.state.title}
                                onChange={this.onChangeTitle} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>
                                Your Email :
                            </Form.Label>
                            <Form.Control autoFocus type="email" value={this.state.email}
                                onChange={this.onChangeEmail} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="name">
                            <Form.Label>
                                Your Name :
                            </Form.Label>
                            <Form.Control autofocus type="text" value={this.state.name}
                                onChange={this.onChangeName} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="max_applicants">
                            <Form.Label>
                                Max Applicants :
                            </Form.Label>
                            <Form.Control autofocus type="number" value={this.state.max_applicants}
                                onChange={this.onChangeMax_applicants} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="max_positions">
                            <Form.Label>
                                Max Positions :
                            </Form.Label>
                            <Form.Control autofocus type="number" value={this.state.max_positions}
                                onChange={this.onChangeMax_positions} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="deadline">
                            <Form.Label>
                                Deadline of filling the form :
                            </Form.Label>
                            <Form.Control autofocus type="date" value={this.state.deadline }
                                onChange={this.onChangeDeadline } />
                        </Form.Group>
                        <Form.Group size="lg" controlId="requiredskills">
                            <Form.Label>
                                Required Skills :
                            </Form.Label>
                            <Language />
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
                                Duration (in months) :
                            </Form.Label>
                            <Form.Control autofocus type="Number" value={this.state.duration}
                                onChange={this.onChangeDuration} />
                        </Form.Group>
                        <Form.Group size="lg" controlId="salary">
                            <Form.Label>
                                Salary :
                            </Form.Label>
                            <Form.Control autofocus type="number" value={this.state.salary}
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