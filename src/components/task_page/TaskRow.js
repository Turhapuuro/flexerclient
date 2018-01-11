import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import DeleteButton from '../common/buttons/DeleteButton';

import { formatHours } from '../../helper_functions/timeformatfunctions';
import { gridContainer } from './TaskPage';
import { orange } from 'material-ui/colors';


const styles = theme => ({
    taskGridContainer: {
        ...gridContainer,
        cursor: 'pointer',
        height: 52,
        paddingTop: 4,
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: orange[100],
        }
    },
    taskNameCell: {
        paddingTop: '9px !important',
    },
    taskDeleteCell: {
        textAlign: 'center',
    },
});

const TaskRow = (props) => {
    const { classes, task, toggleTaskEdit, deleteTask, projects } = props;

    return (
        <Grid
            container
            className={classes.taskGridContainer}
            onClick={(e) => {
                // Prevent toggleTaskEdit function from launching in <PageContainer>.
                e.stopPropagation();
                toggleTaskEdit(task);
            }}
        >
            <Grid item xs={2} className={classes.taskNameCell}>
                {task.name}
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2} className={classes.taskNameCell}>
                {projects.map(element => { return (
                     element.id === task.project_id ? element.name : null
                    )}
                )}
            </Grid>
            <Grid item xs>
                {formatHours(task.start)}
            </Grid>
            <Grid item xs>
                {formatHours(task.end)}
            </Grid>
            <Grid item xs>
                {task.break_time.substring(0, 5)}
            </Grid>
            <Grid item xs>
                {task.total_hours.substring(0, 5)}
            </Grid>
            <Grid item xs />
            <Grid item xs className={classes.taskDeleteCell}>
                <DeleteButton
                    onClick={(e) => {
                        // Prevent <Grid container> toggleTaskEdit function from launching.
                        e.stopPropagation();
                        deleteTask(task.task_id);
                    }}
                />
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
