import React, { Component } from 'react';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            content: [],
            requestError: false
        }

    }

    componentDidMount() {
        this.getUserDetails()
    }

    handleRemove = (value) => () => {
        (async () => {
            const rawResponse = await fetch(`http://localhost:8000/v1/user/delete/${value.user_name}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const content = await rawResponse.json();
            this.getUserDetails();
        })();
    }
    getUserDetails = () => {
        fetch('http://localhost:8000/v1/user')
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed.')
                }
                return response;
            })
            .then(data => data.json())
            .then(data => {
                this.setState({
                    content: data
                });
            }, (ex) => {
                this.setState({
                    requestError: true
                });
            })
    }
    handleSearch=(event)=>{
        if(event.target.value.length){
            fetch(`http://localhost:8000/v1/user/search?q=${event.target.value}`)
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed.')
                }
                return response;
            })
            .then(data => data.json())
            .then(data => {
                this.setState({
                    content: data
                });
            }, (ex) => {
                this.setState({
                    requestError: true
                });
            })
        } else{
            this.getUserDetails();
        }
       
    }

    render() {
        const rowData = this.state.content.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="pt-3-half" >{value.first_name} </td>
                    <td className="pt-3-half" >{value.last_name}</td>
                    <td className="pt-3-half" >{value.user_name}</td>
                    <td>
                        <span className="table-remove">
                            <button onClick={this.handleRemove(value)} type="button" className="btn btn-danger btn-rounded btn-sm my-0">Remove</button>
                        </span>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h3 className="card-header text-center font-weight-bold text-uppercase py-4">User Data</h3>
                            <div className="card-body">
                                <div id="table" className="table-editable">
                                    <input className="form-control" type="text" onChange={this.handleSearch} placeholder="Search Name" />
                                    <table className="table table-bordered table-responsive-md table-striped text-center">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Username</th>
                                                <th className="text-center">First Name</th>
                                                <th className="text-center">Last Name</th>
                                                <th className="text-center">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowData}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }

}