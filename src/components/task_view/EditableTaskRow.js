import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import { withStyles } from 'material-ui/styles';

import { formatHours } from '../../helper_functions/timeformatfunctions';

import SaveButton from '../common/buttons/SaveButton';
import DeleteButton from '../common/buttons/DeleteButton';
import TaskDatePicker from './TaskDatePicker';

import { gridContainer } from './TaskPage';
import { grey, yellow } from 'material-ui/colors';


const styles = (theme) => ({
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
    taskField: {
        marginTop: 0,
    },
});

class EditableTaskRow extends Component {
    constructor(props) {
        super(props);

        const { task } = props;
        task.date = moment(task.date);

        this.state = {
            task,
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTaskFieldChange = this.handleTaskFieldChange.bind(this);
    }

    handleTaskFieldChange(key, value) {
        const { task } = this.state;
        task[key] = value;
        this.setState({ task });
    }

    renderField(key, placeholder) {
        const { classes } = this.props;
        const { task } = this.state;
        const value = task[key];

        return (
            <TextField
                name={key}
                placeholder={placeholder}
                classes={{ root: classes.taskField }}
                value={value}
                onChange={(e) => this.handleTaskFieldChange(key, e.target.value)}
                margin="normal"
                multiline={true}
            />
        );
    }

    onTaskSaveClick() {
        const { task } = this.state;
        const apiTask = task;

        this.props.editTask(apiTask);
        this.props.toggleTaskEdit(null);
    }

    handleDateChange(date) {
        const { task } = this.state;
        task.date = date;
        this.setState({ task });
    }

    render () {
        const { classes, deleteTask } = this.props;
        const { task } = this.state;

        return (
            <Grid
                key={task.task_id}
                container
                className={classes.taskGridContainer + ' active'}
            >
                <Grid item xs={2}>
                    {this.renderField('name', 'task name')}
                </Grid>
                <Grid item xs={2}>
                    <TaskDatePicker
                        value={task.date}
                        onChange={this.handleDateChange}
                    />
                </Grid>
                <Grid item xs>
                    {formatHours(task.start)}
                </Grid>
                <Grid item xs>
                    {formatHours(task.end)}
                </Grid>
                <Grid item xs>
                    {task.break_time}
                </Grid>
                <Grid item xs>
                    {task.total_hours}
                </Grid>
                <Grid item xs>
                    <SaveButton onClick={() => this.onTaskSaveClick()} />
                </Grid>
                <Grid item xs>
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
