import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import DeleteButton from '../common/buttons/DeleteButton';

import {formatHours} from '../../helper_functions/timeformatfunctions';
import { gridContainer } from './TaskPage';
import { orange } from 'material-ui/colors';


const styles = theme => ({
    taskGridContainer: {
        ...gridContainer,
        cursor: 'pointer',
        height: 52,
        '&:hover': {
            backgroundColor: orange[100],
        }
    }
});

const TaskRow = (props) => {
    const { classes, task, toggleTaskEdit, deleteTask } = props;
    return (
        <Grid
            key={task.task_id + 'default'}
            container
            className={classes.taskGridContainer}
            onClick={() => toggleTaskEdit(task)}
        >
            <Grid item xs={2}>{task.name}</Grid>
            <Grid item xs={2} />
            <Grid item xs>{formatHours(task.start)}</Grid>
            <Grid item xs>{formatHours(task.end)}</Grid>
            <Grid item xs>{task.break_time}</Grid>
            <Grid item xs>{task.total_hours}</Grid>
            <Grid item xs />
            <Grid item xs>
                <DeleteButton onClick={() => deleteTask(task.task_id)} />
            </Grid>
        </Grid>
    )
}

TaskRow.propTypes = {
    task: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    toggleTaskEdit: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(TaskRow);
