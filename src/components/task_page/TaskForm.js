import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import AddButton from '../common/buttons/AddButton';
import TaskTextField from './TaskTextField';
import TaskDatePicker from './TaskDatePicker';
import HourMinuteField from './HourMinuteField';
import SelectField from '../common/inputs/SelectField';

import {
    getDateTime,
    hourAndMinuteStringToMinutes,
    minutesToHoursAndMinutes
} from '../../helper_functions/timeformatfunctions';
import { gridContainer } from './TaskPage';
import { grey } from 'material-ui/colors';


const styles = theme => ({
    taskAddingGridWrapper: {
        position: 'fixed',
        zIndex: 100,
        padding: '4px 0',
        borderBottom: `1px solid ${grey[300]}`,
        boxShadow: `${grey[400]} 0px 0px 4px`,
        backgroundColor: 'white',
    },
    gridContainer: {
        ...gridContainer,
    },
    taskTotalCellText: {
        paddingTop: 6,
    },
    taskAddButtonCell: {
        paddingTop: '18px !important',
        textAlign: 'center',
    },
});

class TaskForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: props.getInitialTaskState(),
        };

        this.handleTaskFieldChange = this.handleTaskFieldChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleTaskFieldChange(key, value) {
        const { task } = this.state;
        task[key] = value;
        this.setState({ task });

        if (['start', 'end', 'break_time'].includes(key)) {
            const total = TaskForm.getTotalHours(task);
            this.handleTaskFieldChange('total', total);
        }
    }

    static getTotalHours(task, handleTaskFieldChange) {
        const { start, end, break_time } = task;
        const startMinutes = hourAndMinuteStringToMinutes(start);
        const endMinutes = hourAndMinuteStringToMinutes(end);

        if (endMinutes > startMinutes) {
            const breakMinutes = hourAndMinuteStringToMinutes(break_time);
            const totalMinutes = endMinutes - startMinutes - breakMinutes;
            return minutesToHoursAndMinutes(totalMinutes);
        }

        return '00:00';
    }

    onAddTaskClick() {
        let { name, date, start, end, break_time, total, project_id } = this.state.task;

        break_time = break_time || '00:00';

        start = getDateTime(start);
        end = getDateTime(end);

        this.props.addTask({
            name,
            date,
            start,
            end,
            break_time,
            total_hours: total,
            project_id: project_id === 'None' ? '' : project_id,
        });

        this.setState({
            task: this.props.getInitialTaskState(),
        });
    }

    static renderField(task, key, placeholder, handleTaskFieldChange, options) {
        const value = task[key];

        if (['start', 'end', 'break_time'].includes(key)){
            return (
                <HourMinuteField
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => handleTaskFieldChange(key, e.target.value)}
                />
            );
        }

        if (options) {
            return (
                <SelectField
                    options={options}
                    value={value || ''}
                    onChange={(e) => handleTaskFieldChange(key, e.target.value)}
                />
            )
        }

        return (
            <TaskTextField
                value={value}
                onChange={(e) => handleTaskFieldChange(key, e.target.value)}
                placeholder={placeholder}
                autoFocus={key === 'name'}
            />
        );
    }

    handleDateChange(date) {
        const { task } = this.state;
        task.date = date;
        this.setState({ task });
    }

    render() {
        const { classes, mapProjects } = this.props;
        const { task } = this.state;
        const { renderField } = TaskForm;

        return (
            <div className={classes.taskAddingGridWrapper}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={2}>
                        <div>Task</div>
                        {renderField(
                            task,
                            'name',
                            'task name',
                            this.handleTaskFieldChange
                        )}
                    </Grid>
                    <Grid item xs={2}>
                        <div>Date</div>
                        <TaskDatePicker
                            value={task.date}
                            onChange={this.handleDateChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div>Project</div>
                        {renderField(
                            task,
                            'project_id',
                            'project name',
                            this.handleTaskFieldChange,
                            mapProjects
                        )}
                    </Grid>
                    <Grid item xs>
                        <div>Start</div>
                        {renderField(
                            task,
                            'start',
                            '08:00',
                            this.handleTaskFieldChange
                        )}
                    </Grid>
                    <Grid item xs>
                        <div>End</div>
                        {renderField(
                            task,
                            'end',
                            '17:00',
                            this.handleTaskFieldChange
                        )}
                    </Grid>
                    <Grid item xs>
                        <div>Break</div>
                        {renderField(
                            task,
                            'break_time',
                            '00:00',
                            this.handleTaskFieldChange
                        )}
                    </Grid>
                    <Grid item xs>
                        <div>Duration</div>
                        <div className={classes.taskTotalCellText}>{task.total}</div>
                    </Grid>
                    <Grid item xs />
                    <Grid item xs className={classes.taskAddButtonCell}>
                        <AddButton onClick={() => this.onAddTaskClick()} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

TaskForm.propTypes = {
    classes: PropTypes.object.isRequired,
    getInitialTaskState: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(TaskForm);
