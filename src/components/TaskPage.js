import React, {Component}from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fetchTasks, addTask, editTask, deleteTask } from '../actions/tasks';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import moment from 'moment';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import DeleteButton from './DeleteButton';

import { drawerWidth } from './Navigation';
import { blue, green, grey, yellow } from 'material-ui/colors';


const gridContainer = {
    width: '100%',
    margin: 0,
};

const styles = theme => ({
    pageFrame: {
        width: `calc(100% - ${drawerWidth}px)`,
        float: 'right',
    },
    taskAddingGridWrapper: {
        padding: 10,
        borderBottom: `1px solid ${grey[300]}`,
        boxShadow: `${grey[400]} 1px 1px 5px`,
    },
    listElement: {
        backgroundColor: blue[500],
        borderBottom: `1px solid ${grey[300]}`,
    },
    addButton: {
        color: green[500],
    },
    saveButton: {
        color: green[500],
    },
    weekDay: {
        textAlign: 'left',
    },
    gridContainer: {
        ...gridContainer,
    },
    taskGridContainer: {
        ...gridContainer,
        cursor: 'pointer',
        height: 62,
        '&:hover': {
            backgroundColor: grey[100],
        },
        '&.active': {
            backgroundColor: yellow[100],
        }
    },
    weekDayBlock: {
        padding: 10,
        borderBottom: `1px solid ${grey[300]}`,
    },
    taskField: {
        marginTop: 0,
    },
});

class TaskPage extends Component {
    constructor() {
        super();

        this.state = {
            task: {
                name: 'pottu',
                date: '',
                start: '',
                end: '',
                break: '00:00',
                total: '00:00',
            },
            editableTask: null,
        };

        this.handleTaskFieldChange = this.handleTaskFieldChange.bind(this);
        this.toggleTaskEdit = this.toggleTaskEdit.bind(this);
        this.onTaskSaveClick = this.onTaskSaveClick.bind(this);
    }

    componentWillMount() {
        this.props.fetchTasks();
    }

    formatHours(date) {
        return moment(date).format('HH:mm');
    }

    getWeekDay(date) {
        return moment(date).format('dddd');
    }

    handleTaskFieldChange(key, value, isEditField) {
        if (isEditField) {
            const { editableTask } = this.state;
            editableTask[key] = value;
            this.setState({ editableTask });
        } else {
            const { task } = this.state;
            task[key] = value;
            this.setState({ task });
            if (['start', 'end'].includes(key)) {
                this.updateTotalHours();
            }
        }
    }

    renderField(key, placeholder, colSize = true, isEditField) {
        const { classes } = this.props;
        const { task, editableTask } = this.state;

        const value = isEditField ? editableTask[key] : task[key];

        return (
            <Grid item xs={colSize}>
                <TextField
                    name={key}
                    placeholder={placeholder}
                    classes={{ root: classes.taskField }}
                    value={value}
                    onChange={(e) => this.handleTaskFieldChange(key, e.target.value, isEditField)}
                    margin="normal"
                    multiline={true}
                />
            </Grid>
        );
    }

    getHoursAndMinutes(timeString) {
        const hours = parseInt(timeString.substring(0, 2), 10);
        const minutes = parseInt(timeString.substring(3, 5), 10);
        return { hours, minutes };
    }

    getDateTime(timeString) {
        // Expected timeString format 'hh:mm'
        // Does not handle time in format 1:00 yet.
        const { hours, minutes } = this.getHoursAndMinutes(timeString);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        return date;
    }

    updateTotalHours() {
        const { start, end } = this.state.task;
        let total = '00:00';
        if (start && end) {
            const startDate = this.getDateTime(start);
            const endDate = this.getDateTime(end);
            const milliseconds = Math.abs(endDate - startDate);

            if (milliseconds) {
                const tempTime = moment.duration(milliseconds);
                const hours = tempTime.hours();
                const minutes = tempTime.minutes();
                total = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            }
        }
        this.handleTaskFieldChange('total', total);
    }

    onAddTaskClick() {
        const { name, start, end, total } = this.state.task;

        // Expected API date format "2018-01-04T16:44:14.051000Z"
        const start_date = this.getDateTime(start);
        const end_date = this.getDateTime(end);

        this.props.addTask({
            name,
            start_date,
            end_date,
            break_time: '00:00',
            total_hours: total,
        });
    }

    onTaskSaveClick() {
        const { editableTask } = this.state;
        const apiTask = editableTask;

        this.props.editTask(apiTask);
        this.toggleTaskEdit(null);
    }

    toggleTaskEdit(editableTask) {
        this.setState({ editableTask });
    }

    renderTaskRow(task, classes) {
        const { editableTask } = this.state;
        if (editableTask && editableTask.task_id === task.task_id) {
            return (
                <Grid
                    container
                    className={classes.taskGridContainer + ' active'}
                >
                    {this.renderField('name', 'task name', 2, true)}
                    <Grid item xs={2} />
                    <Grid item xs>{this.formatHours(task.start_date)}</Grid>
                    <Grid item xs>{this.formatHours(task.end_date)}</Grid>
                    <Grid item xs>{task.break_time}</Grid>
                    <Grid item xs>{task.total_hours}</Grid>
                    <Grid item xs>
                        <Button
                            classes={{ root: classes.addButton }}
                            onClick={() => this.onTaskSaveClick()}
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <DeleteButton onClick={() => this.props.deleteTask(task.task_id)} />
                    </Grid>
                </Grid>
            );
        }
        return (
            <Grid
                container
                className={classes.taskGridContainer}
                onClick={() => this.toggleTaskEdit(task)}
            >
                <Grid item xs={2}>{task.name}</Grid>
                <Grid item xs={2} />
                <Grid item xs>{this.formatHours(task.start_date)}</Grid>
                <Grid item xs>{this.formatHours(task.end_date)}</Grid>
                <Grid item xs>{task.break_time}</Grid>
                <Grid item xs>{task.total_hours}</Grid>
                <Grid item xs />
                <Grid item xs>
                    <DeleteButton onClick={() => this.props.deleteTask(task.task_id)} />
                </Grid>
            </Grid>
        );
    }

    getUniqueWeekDays(tasks) {
        // Group items by weekday,
        // Start date needs to be collected in here in order to separate days from different weeks.
        return tasks ? _.uniq(tasks.map((task) => this.getWeekDay(task.start_date))) : [];
    }

    render(){
        const { tasks, classes } = this.props;
        const { task } = this.state;

        const weekDays = this.getUniqueWeekDays(tasks);

        return (
            <div className={classes.pageFrame}>
                <div className={classes.taskAddingGridWrapper}>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={2}>Task</Grid>
                        <Grid item xs={2}>Date</Grid>
                        <Grid item xs>Start</Grid>
                        <Grid item xs>End</Grid>
                        <Grid item xs>Break</Grid>
                        <Grid item xs>Hours</Grid>
                        <Grid item xs />
                        <Grid item xs />
                    </Grid>
                    <Grid container className={classes.gridContainer}>
                        {this.renderField('name', 'task name', 2)}
                        {this.renderField('date', 'date', 2)}
                        {this.renderField('start', '08:00')}
                        {this.renderField('end', '17:00')}
                        {this.renderField('break', '00:00')}
                        <Grid item xs>{task.total}</Grid>
                        <Grid item xs />
                        <Grid item xs>
                            <Button
                                classes={{ root: classes.addButton }}
                                onClick={() => this.onAddTaskClick()}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                {weekDays.map((weekDay) => (
                    <div className={classes.weekDayBlock}>
                        <Grid container>
                            <Grid item xs={2}>{weekDay}</Grid>
                            <Grid item xs={2}>render date here</Grid>
                        </Grid>
                        {tasks.map((task) => {
                            if (this.getWeekDay(task.start_date) === weekDay) {
                                return this.renderTaskRow(task, classes);
                            }
                            return null;
                        })}
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
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    tasks: state.tasksStore.tasks,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        addTask: (task) => dispatch(addTask(task)),
        editTask: (task) => dispatch(editTask(task)),
        deleteTask: (id) => dispatch(deleteTask(id)),
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(TaskPage));
