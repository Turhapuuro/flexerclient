import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import TaskForm from './TaskForm';
import TaskDatePicker from './TaskDatePicker';
import SaveButton from '../common/buttons/SaveButton';
import DeleteButton from '../common/buttons/DeleteButton';

import { formatHours, getDateTime } from '../../helper_functions/timeformatfunctions';
import { gridContainer } from './TaskPage';
import { orange } from 'material-ui/colors';


const styles = (theme) => ({
    editableTaskRow: {
        ...gridContainer,
        height: 52,
        backgroundColor: orange[200],
    },
    taskTotalCell: {
        paddingTop: '12px !important',
    },
    taskDeleteCell: {
        paddingTop: '12px !important',
        textAlign: 'center',
    },
});

class EditableTaskRow extends Component {
    constructor(props) {
        super(props);

        const { task, projects } = props;
        task.date = moment(task.date);
        task.start = formatHours(task.start);
        task.end = formatHours(task.end);
        task.total_hours = task.total_hours.substring(0, 5);

        this.state = {
            task,
            projects
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTaskFieldChange = this.handleTaskFieldChange.bind(this);
    }

    handleTaskFieldChange(key, value) {
        const { task } = this.state;
        task[key] = value;
        this.setState({ task });
        console.log(key, value);

        if (['start', 'end', 'break_time'].includes(key)) {
            const total = TaskForm.getTotalHours(task);
            this.handleTaskFieldChange('total_hours', total);
        }
    }

    onTaskSaveClick() {
        let { task_id, name, date, start, end, break_time, total_hours, project_id } = this.state.task;

        start = getDateTime(start);
        end = getDateTime(end);

        this.props.editTask({
            task_id,
            name,
            date,
            start,
            end,
            break_time,
            total_hours,
            project_id
        });

        this.props.toggleTaskEdit(null);
    }

    handleDateChange(date) {
        const { task } = this.state;
        task.date = date;
        this.setState({ task });
    }

    render () {
        const { classes, deleteTask, mapProjects } = this.props;
        const { task } = this.state;
        const { renderField } = TaskForm;

        return (
            <Grid
                container
                className={classes.editableTaskRow}
                onClick={(e) => {
                    // Stop editTaskToggle from launching when clicking between cells.
                    e.stopPropagation();
                }}
            >
                <Grid item xs={2}>
                    {renderField(
                        task,
                        'name',
                        'task name',
                        this.handleTaskFieldChange
                    )}
                </Grid>
                <Grid item xs={2}>
                    <TaskDatePicker
                        value={task.date}
                        onChange={this.handleDateChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    {renderField(
                        task,
                        'project_id',
                        'project name',
                        this.handleTaskFieldChange,
                        mapProjects
                    )}
                </Grid>
                <Grid item xs>
                    {renderField(
                        task,
                        'start',
                        '08:00',
                        this.handleTaskFieldChange
                    )}
                </Grid>
                <Grid item xs>
                    {renderField(
                        task,
                        'end',
                        '17:00',
                        this.handleTaskFieldChange
                    )}
                </Grid>
                <Grid item xs>
                    {renderField(
                        task,
                        'break_time',
                        '00:00',
                        this.handleTaskFieldChange
                    )}
                </Grid>
                <Grid item xs className={classes.taskTotalCell}>
                    {task.total_hours}
                </Grid>
                <Grid item xs>
                    <SaveButton onClick={() => this.onTaskSaveClick()} />
                </Grid>
                <Grid item xs className={classes.taskDeleteCell}>
                    <DeleteButton onClick={() => deleteTask(task.task_id)} />
                </Grid>
            </Grid>
        )
    };
    
}

EditableTaskRow.propTypes = {
    task: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    toggleTaskEdit: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(EditableTaskRow);
