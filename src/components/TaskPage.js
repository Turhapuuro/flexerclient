import React, {Component}from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fetchTasks, addTask, deleteTask } from '../actions/tasks';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import { drawerWidth } from './Navigation';
import { blue, green, grey, red } from 'material-ui/colors';


const styles = theme => ({
    pageFrame: {
        width: `calc(100% - ${drawerWidth}px)`,
        float: 'right',
    },
    listElement: {
        backgroundColor: blue[500],
        borderBottom: `1px solid ${grey[300]}`,
        // margin: '0 -8px',
    },
    addButton: {
        color: green[500],
    },
    deleteButton: {
        color: red[500],
        height: 20,
        width: 20,
    },
    weekDay: {
        textAlign: 'left',
    },
    gridContainer: {
        width: '100%',
        margin: 0,
    },
    taskField: {
        marginTop: 0,
    }
});

class TaskPage extends Component {
    state = {
        task: {
            name: '',
            start_date: '',
            end_date: '',
            break_time: '00:00',
            total_hours: '00:00',
        }
    }

    componentWillMount() {
        this.props.fetchTasks();
    }

    formatHours(date) {
        return moment(date).format('hh:mm');
    }

    getWeekDay(date) {
        return moment(date).format('dddd');
    }

    handleTaskFieldChange(key, value) {

    }

    renderField(key, placeholder, colSize) {
        const { classes } = this.props;

        return (
            <Grid item xs={colSize || true}>
                <TextField
                    name={key}
                    placeholder={placeholder}
                    classes={{ root: classes.taskField }}
                    value={this.state.task[key]}
                    onChange={(e, value) => this.handleTaskFieldChange(key, value)}
                    margin="normal"
                />
            </Grid>
        );
    }

    onAddTaskClick() {
        const date = new Date();
        const task = {
            name: 'supacool task',
            start_date: date,
            end_date: date,
            break_time: '09:00',
            total_hours: '00:00',
        };
        this.props.addTask(task);
    }

    render(){
        const { tasks, classes } = this.props;
        console.log(tasks);

        return (
            <div className={classes.pageFrame}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={2}>Task</Grid>
                    <Grid item xs={2}>Date</Grid>
                    <Grid item xs>Start</Grid>
                    <Grid item xs>End</Grid>
                    <Grid item xs>Break</Grid>
                    <Grid item xs>Hours</Grid>
                    <Grid item xs />
                </Grid>
                <Grid container className={classes.gridContainer}>
                    {this.renderField('name', 'task name', 2)}
                    {this.renderField('date', 'date', 2)}
                    {this.renderField('start', '08:00')}
                    {this.renderField('end', '17:00')}
                    {this.renderField('break', '00:00')}
                    <Grid item xs>render total here</Grid>
                    <Grid item xs>
                        <Button
                            classes={{ root: classes.addButton }}
                            onClick={() => this.onAddTaskClick()}
                            color='primary'
                            type='submit'
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
                {tasks && tasks.map(task => (
                    <div key={task.task_id}>
                        <div className={classes.weekDay}>{this.getWeekDay(task.start_date)}</div>
                        <Grid container className={classes.gridContainer}>
                            <Grid item xs={2}>{task.name}</Grid>
                            <Grid item xs={2} />
                            <Grid item xs>{this.formatHours(task.start_date)}</Grid>
                            <Grid item xs>{this.formatHours(task.end_date)}</Grid>
                            <Grid item xs>{task.break_time}</Grid>
                            <Grid item xs>{task.total_hours}</Grid>
                            <Grid item xs>
                                <IconButton
                                    onClick={() => this.props.deleteTask(task.task_id)}
                                    classes={{ root: classes.deleteButton }}
                                >
                                    <Close />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </div>
        )
    }
}

TaskPage.propTypes = {
    tasks: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    tasks: state.tasksStore.tasks,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        addTask: (task) => dispatch(addTask(task)),
        deleteTask: (id) => dispatch(deleteTask(id)),
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(TaskPage));
