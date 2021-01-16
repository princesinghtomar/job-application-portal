import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            logedin_user: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
    }
    /* array = [] */
    componentDidMount() {
        axios.get('http://localhost:4000/login')
            .then(response => {
                var array = response.data.map(x => [x.email, x.motive]);
                this.setState({ logedin_user: array });
                console.log(this.state.logedin_user[0])
                this.onChangeName();
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/user')
            .then(response => {
                this.setState({ user: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(event) {
        document.getElementById("para_id").innerHTML = ""+
        "<label><pre>Name :  </pre></label> " + this.state.logedin_user[0][0];
        var temp1 = document.getElementById("para_id").innerHTML;
        console.log(temp1);
    }

    render() {
        return (
            <div>
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Profile
                    </h1>
                </div>
                <div>
                    <p style={{ textAlign: 'left', color: 'red' }} id="para_id">
                        <label><pre>Name :  </pre></label>  
                    </p>
                </div>
            </div>
        )
    }
}

export default Profile;