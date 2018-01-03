import React, {Component}from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import moment from 'moment';


class Jaahas extends Component{
    state = {
        users: null,
        tasks: null
    }

    componentWillMount() {
        this.fetchTasks();
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

    formatHours(date) {
        return moment(date).format('hh:mm');
    }

    getWeekDay(date) {
        return moment(date).format('dddd');
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
                // name
                // start_date
                // end_date
                // break_time
                // total_hours
                const taskEl = (
                    <div>
                        <div>{this.getWeekDay(task.start_date)}</div>
                        <span>
                            <span style={{ margin: 5 }}>{task.name}</span>
                            <span style={{ margin: 5 }}>{this.formatHours(task.start_date)}</span>
                            <span style={{ margin: 5 }}>{this.formatHours(task.end_date)}</span>
                            <span style={{ margin: 5 }}>{task.break_time}</span>
                            <span style={{ margin: 5 }}>{task.total_hours}</span>
                        </span>
                    </div>
                );
                return (<li key={task.name}>{taskEl}</li>);
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