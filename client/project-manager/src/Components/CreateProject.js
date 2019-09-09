import React, { Component } from 'react'
import Breadcrumb from './Breadcrumb'

export default class CreateProject extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            owner: '',
            users: [],
            description: '',
            createdDate: '' 
        }
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then(json => {
            this.setState({
            users: json
            });
        }).catch(error => console.log(error));
    }

    handleSubmit = (event) => {
        const {name,owner,description,createdDate} = this.state;
        event.preventDefault();
        fetch('http://localhost:5000/api/projects',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, description, owner, createdDate})
        }).then(response => response.json())
        .catch(error => console.log(error));

        this.setState({
            name: '',
            owner: '',
            description: '',
            createdDate: ''
        });
    }

    render() {
        return (
            <div>
                <Breadcrumb name={'Create A New Project'}/>
                <div className="mx-auto text-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row justify-content-center">
                            <label>
                                Project Name
                                <input placeholder="Project Name" className="form-control" type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Project Description
                                <textarea placeholder="Enter a short project description" maxLength="200" cols="50" rows="4" className="form-control" value={this.state.description} name="description" onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Assigned User
                                <select name="owner" className="form-control" value={this.state.owner} onChange={this.handleChange}>
                                    <option> </option>
                                    {this.state.users.map(user => {
                                        return <option key={user.id}>{user.name}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>Created Date
                                <input type="date" className="form-control" value={this.state.createdDate} onChange={this.handleChange} name="createdDate" />
                            </label>
                        </div>
                        <div className="row justify-content-center">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
