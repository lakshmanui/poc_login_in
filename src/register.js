import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            user_name: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        (async () => {
            const rawResponse = await fetch('http://localhost:8000/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            });
            const content = await rawResponse.json();
            if(content.message === 'success'){
                this.props.history.push('/')
            }
        })();
        console.log(event.target.checkValidity())
        
    }
    render() {

        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={this.handleSubmit}>
                        <h4>Register</h4>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text"
                                onChange={this.handleInputChange}
                                className="form-control"
                                name="first_name"
                                placeholder="Enter Firstname" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text"
                                onChange={this.handleInputChange}
                                className="form-control"
                                name="last_name"
                                placeholder="Enter Lastname" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                onChange={this.handleInputChange}
                                className="form-control"
                                name="user_name"
                                placeholder="Enter Username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password</label>
                            <input type="password"
                                onChange={this.handleInputChange}
                                className="form-control"
                                name="password"
                                placeholder="Enter Password" />
                        </div>
                        <button className="btn btn-primary">Register</button>  <Link to="/">Login</Link>
                    </form>
                </div>
            </div>
        )
    }
}