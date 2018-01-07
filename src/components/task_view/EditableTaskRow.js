import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import { withStyles } from 'material-ui/styles';

import { formatHours } from '../../helper_functions/timeformatfunctions';

import SaveButton from '../common/buttons/SaveButton';
import DeleteButton from '../common/buttons/DeleteButton';

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

        this.state = {
            task: props.task,
        };
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

    render () {
        const { classes, deleteTask } = this.props;
        const {task} = this.state;
        return (
            <Grid
                key={task.task_id}
                container
                className={classes.taskGridContainer + ' active'}
            >
                <Grid item xs={2}>
                    {this.renderField('name', 'task name')}
                </Grid>
                <Grid item xs={2} />
                <Grid item xs>
                    {formatHours(task.start_date)}
                </Grid>
                <Grid item xs>
                    {formatHours(task.end_date)}
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
    onTaskSaveClick: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(EditableTaskRow);
