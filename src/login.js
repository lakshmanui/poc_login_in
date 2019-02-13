import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        console.log(this.state);
        (async () => {
            const rawResponse = await fetch('http://localhost:8000/v1/auth/login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state)
            });
            const content = await rawResponse.json();
            console.log(content)
            if(content.message === 'success'){
                this.props.history.push('dashboard')
            }
          })();
        
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={this.handleSubmit}>
                        <h4>Login</h4>
                        <div className="form-group">
                            <label htmlFor="Username">Username</label>
                            <input type="text"
                                name="user_name"
                                className="form-control"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={this.handleInputChange} 
                                required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input name="password"
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                placeholder="Enter Password"
                                onChange={this.handleInputChange} 
                                required/>
                        </div>

                        <button className="btn btn-primary" type="submit" >Login</button> <Link to="/register">Register</Link>
                    </form>
                </div>
            </div>

        )
    }
}