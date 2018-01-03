import React, {Component}from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';

class Jaahas extends Component{
    state = {
        users: null,
        tasks: null
    }

    fetchUsers = () => {
        axios.get('/users')
            .then(response => {
                this.setState({
                    users: response.data
                });
            });
    }

    fetchTasks = () => {
        axios.get('/tasks')
            .then(response => {
                this.setState({
                    tasks: response.data
                });
            });
    }

    render(){
        const style = {
            margin: 12,
        };

        let users = null;
        let tasks = null;

        if (this.state.users !== null) {
            users = this.state.users.map(user => {
                return (<li key={user.email}>{user.email}</li>)
            })
        }

        if (this.state.tasks !== null) {
            tasks = this.state.tasks.map(task => {
                return (<li key={task.name}>{task.name}</li>)
            })
        }

        return (
            <div>
                <RaisedButton label="Jaahas" style={style} secondary={true}/>
                <FontIcon className="material-icons">home</FontIcon>
                <RaisedButton onClick={this.fetchTasks}
                    label="Matias" labelPosition="before" primary={true}
                    icon={<FontIcon className="material-icons">announcement</FontIcon>}
                    style={style}>
                </RaisedButton>
                <IconButton onClick={this.fetchUsers}>
                    <FontIcon className="material-icons">announcement</FontIcon>
                </IconButton>
                <ul>
                    {users}
                </ul>
                <ul>
                    {tasks}
                </ul>
            </div>
        )
    }
}

export default Jaahas;