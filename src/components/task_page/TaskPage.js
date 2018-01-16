import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTasks, addTask, editTask, deleteTask } from '../../actions/tasks';
import { fetchProjects } from '../../actions/projects';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';

import PageContainer from '../common/PageContainer';
import TaskRow from './TaskRow';
import EditableTaskRow from './EditableTaskRow';
import TaskForm from './TaskForm';

import { getDate, sortDatesDescOrder } from '../../helper_functions/timeformatfunctions';
import { blue, grey } from 'material-ui/colors';


export const gridContainer = {
    width: '100%',
    margin: 0,
};

const styles = theme => ({
    listElement: {
        backgroundColor: blue[500],
        borderBottom: `1px solid ${grey[300]}`,
    },
    gridContainer: {
        ...gridContainer,
    },
    weekdayBlock: {
        paddingTop: 10,
        borderBottom: `1px solid ${grey[300]}`,
    },
    tasksContainer: {
        margin: '84px 0 48px',
    },
});

class TaskPage extends Component {
    constructor() {
        super();

        this.state = {
            editableTask: null,
        };

        this.toggleTaskEdit = this.toggleTaskEdit.bind(this);
        this.mapProjectsToMenuItems = this.mapProjectsToMenuItems.bind(this);
    }

    getInitialTaskState() {
        return {
            name: 'pottu',
            date: moment(),
            start: '',
            end: '',
            break_time: '',
            total: '00:00',
            project_id: 'None'
        };
    }

    componentWillMount() {
        this.props.fetchTasks();
        this.props.fetchProjects();
    }

    toggleTaskEdit(originalTask) {
        this.setState({ editableTask: { ...originalTask } });
    }

    renderTaskRow(task, classes) {
        const { editableTask } = this.state;
        const { projects } = this.props;
        if (editableTask && editableTask.task_id === task.task_id) {
            return (
                <EditableTaskRow
                    key={`task-row-edit-${task.task_id}`}
                    task={editableTask}
                    deleteTask={this.props.deleteTask}
                    toggleTaskEdit={this.toggleTaskEdit}
                    editTask={this.props.editTask}
                    mapProjects={this.mapProjectsToMenuItems}
                    projects={projects}
                />
            );
        }
        return (
            <TaskRow
                key={`task-row-default-${task.task_id}`}
                task={task}
                deleteTask={this.props.deleteTask}
                toggleTaskEdit={this.toggleTaskEdit}
                projects={projects}
            />
        );
    }

    mapProjectsToMenuItems() {
        const { projects } = this.props;

        return (
            projects.map(project => (
                <MenuItem
                    value={project.id}
                    key={project.id}
                >
                    {project.name}
                </MenuItem>
            ))
        )
    }

    getUniqueDates(tasks) {
        // Group items by weekday,
        // Start date needs to be stored in an object in order to separate days from different weeks.
        const uniqueDates = [];
        tasks.forEach((task) => {
            const date = getDate(task.date);
            if (!uniqueDates.find((uniqueDate) => (uniqueDate.date === date))) {
                const weekday = moment(task.date).format('dddd');
                uniqueDates.push({
                    date,
                    weekday,
                    originalDate: task.date
                });
            }
        });
        return sortDatesDescOrder(uniqueDates, 'originalDate');
    }

    render() {
        const { tasks, classes, projects } = this.props;
        const uniqueDates = this.getUniqueDates(tasks);

        return (
            <PageContainer onClick={() => this.toggleTaskEdit(null)}>
                <TaskForm 
                    addTask={this.props.addTask}
                    mapProjects={this.mapProjectsToMenuItems}
                    getInitialTaskState={this.getInitialTaskState}
                    projects={projects}
                />
                <div className={classes.tasksContainer}>
                    {uniqueDates.map((uniqueDate, i) => (
                        <div key={i} className={classes.weekdayBlock}>
                            <Grid container className={classes.gridContainer}>
                                <Grid item xs={2}>{uniqueDate.weekday}</Grid>
                                <Grid item xs={2}>{uniqueDate.date}</Grid>
                            </Grid>
                            {tasks.map((task) => {
                                const isSameDate = getDate(task.date) === uniqueDate.date;
                                return isSameDate ? this.renderTaskRow(task, classes) : null;
                            })}
                        </div>
                    ))}
                </div>
            </PageContainer>
        )
    }
}

TaskPage.propTypes = {
    tasks: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    tasks: state.taskStore.tasks,
    projects: state.projectStore.projects
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        addTask: (task) => dispatch(addTask(task)),
        editTask: (task) => dispatch(editTask(task)),
        deleteTask: (id) => dispatch(deleteTask(id)),
        fetchProjects: () => dispatch(fetchProjects()),
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(TaskPage));
