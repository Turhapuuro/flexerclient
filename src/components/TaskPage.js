import React, {Component}from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { fetchTasks, addTask, deleteTask } from '../actions/tasks';
import moment from 'moment';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';

import { blue, green, grey } from 'material-ui/colors';


const styles = theme => ({
    listElement: {
        backgroundColor: blue[500],
        borderBottom: `1px solid ${grey[300]}`,
        // margin: '0 -8px',
    },
    testButton: {
        color: green[500],
    },
    weekDay: {
        textAlign: 'left',
    },
});

class TaskPage extends Component{
    componentWillMount() {
        this.props.fetchTasks();
    }

    formatHours(date) {
        return moment(date).format('hh:mm');
    }

    getWeekDay(date) {
        return moment(date).format('dddd');
    }

    onAddTaskClick() {
        const date = new Date();
        const task = {
            name: 'supacool task',
            start_date: date,
            end_date: date,
            break_time: '09:00:00',
            total_hours: '00:00:00',
        };
        this.props.addTask(task);
    }

    render(){
        const { tasks, classes } = this.props;
        console.log(tasks);

        return (
            <div style={{ padding: 8 }}>
                <Button
                    onClick={() => this.onAddTaskClick()}
                    color='primary'
                    classes={{ root: classes.testButton }}
                >
                    Add new task
                </Button>
                <Divider />
                <Grid container>
                    <Grid item xs>Task</Grid>
                    <Grid item xs>Date</Grid>
                    <Grid item xs>Start</Grid>
                    <Grid item xs>End</Grid>
                    <Grid item xs>Break</Grid>
                    <Grid item xs>Hours</Grid>
                    <Grid item xs></Grid>
                </Grid>
                {tasks && tasks.map(task => (
                    // name
                    // start_date
                    // end_date
                    // break_time
                    // total_hours
                    <div key={task.task_id}>
                        <div className={classes.weekDay}>{this.getWeekDay(task.start_date)}</div>
                        <Grid container>
                            <Grid item xs>{task.name}</Grid>
                            <Grid item xs />
                            <Grid item xs>{this.formatHours(task.start_date)}</Grid>
                            <Grid item xs>{this.formatHours(task.end_date)}</Grid>
                            <Grid item xs>{task.break_time}</Grid>
                            <Grid item xs>{task.total_hours}</Grid>
                            <Grid item xs>
                                <IconButton
                                    onClick={() => this.props.deleteTask(task.task_id)}
                                    classes={{ root: classes.testButton }}
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

// export default connect(mapStateToProps, mapDispatchToProps) (Jaahas);
export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(TaskPage));
