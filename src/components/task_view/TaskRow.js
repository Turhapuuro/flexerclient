import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import {formatHours} from '../../helper_functions/timeformatfunctions';

import DeleteButton from '../common/buttons/DeleteButton';

import { gridContainer } from './TaskPage';
import { grey} from 'material-ui/colors';


const styles = theme => ({
    taskGridContainer: {
        ...gridContainer,
        cursor: 'pointer',
        height: 62,
        '&:hover': {
            backgroundColor: grey[100],
        }
    }
});

const TaskRow = (props) => {
    const { classes, task, toggleTaskEdit, deleteTask } = props;
    return (
        <Grid
            key={task.task_id}
            container
            className={classes.taskGridContainer}
            onClick={() => toggleTaskEdit(task)}
        >
            <Grid item xs={2}>{task.name}</Grid>
            <Grid item xs={2} />
            <Grid item xs>{formatHours(task.start_date)}</Grid>
            <Grid item xs>{formatHours(task.end_date)}</Grid>
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
