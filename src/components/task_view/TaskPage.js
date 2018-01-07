import React, {Component}from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import { fetchTasks, addTask, editTask, deleteTask } from '../../actions/tasks';
import { getDate } from '../../helper_functions/timeformatfunctions';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';

import Grid from 'material-ui/Grid';

import TaskRow from './TaskRow';

import { drawerWidth } from '../navigation/Navigation';
import { blue, grey } from 'material-ui/colors';
import EditableTaskRow from './EditableTaskRow';
import TaskForm from './TaskForm';


export const gridContainer = {
    width: '100%',
    margin: 0,
};

const styles = theme => ({
    pageFrame: {
        width: `calc(100% - ${drawerWidth}px)`,
        float: 'right',
    },
    listElement: {
        backgroundColor: blue[500],
        borderBottom: `1px solid ${grey[300]}`,
    },
    weekDay: {
        textAlign: 'left',
    },
    gridContainer: {
        ...gridContainer,
    },
    weekDayBlock: {
        padding: 10,
        borderBottom: `1px solid ${grey[300]}`,
    },
});

class TaskPage extends Component {
    constructor() {
        super();

        this.state = {
            task: this.getInitialTaskState(),
            editableTask: null,
        };

        this.toggleTaskEdit = this.toggleTaskEdit.bind(this);
    }

    getInitialTaskState() {
        return {
            name: 'pottu',
            date: moment(),
            start: '',
            end: '',
            break: '',
            total: '00:00',
        };
    }

    componentWillMount() {
        this.props.fetchTasks();
    }

    toggleTaskEdit(editableTask) {
        this.setState({ editableTask });
    }

    renderTaskRow(task, classes) {
        const { editableTask } = this.state;
        if (editableTask && editableTask.task_id === task.task_id) {
            return (
                <EditableTaskRow
                    key={task.task_id}
                    task={editableTask}
                    deleteTask={this.props.deleteTask}
                    toggleTaskEdit={this.toggleTaskEdit}
                    editTask={this.props.editTask}
                />
            );
        }
        return (
            <TaskRow
                key={task.task_id}
                task={task}
                deleteTask={this.props.deleteTask}
                toggleTaskEdit={this.toggleTaskEdit}
            />
        );
    }

    getUniqueDates(tasks) {
        // Group items by weekday,
        // Start date needs to be stored in an object in order to separate days from different weeks.
        const uniqueDates = [];

        tasks.forEach((task) => {
            const date = getDate(task.date);
            if (!uniqueDates.includes(date)) {
                uniqueDates.push(date);
            }
        });
        console.log(uniqueDates);
        return uniqueDates;
    }

    render(){
        const { tasks, classes } = this.props;
        const dates = this.getUniqueDates(tasks);

        return (
            <div className={classes.pageFrame}>
                <TaskForm 
                    addTask={this.props.addTask}
                    getInitialTaskState={this.getInitialTaskState}
                />
               {dates.map((date, i) => (
                    <div key={i} className={classes.weekDayBlock}>
                        <Grid container>
                            <Grid item xs={2}>{moment(date).format('dddd')}</Grid>
                            <Grid item xs={2}>{date}</Grid>
                        </Grid>
                        {tasks.map((task) => {
                            const isSameDate = getDate(task.date) === date;
                            return isSameDate ? this.renderTaskRow(task, classes) : null;
                        })}
                    </div>
                ))}
                {/* {tasks.map((task) => {
                    return this.renderTaskRow(task, classes)
                    //const isSameWeekDay = getDate(task.date) === date;
                    //return isSameWeekDay ? this.renderTaskRow(task, classes) : null;
                })} */}
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
