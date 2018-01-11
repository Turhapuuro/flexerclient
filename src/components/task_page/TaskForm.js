import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';

import Grid from 'material-ui/Grid';

import AddButton from '../common/buttons/AddButton';
import TaskTextField from './TaskTextField';
import TaskDatePicker from './TaskDatePicker';
import HourMinuteField from './HourMinuteField';
import ProjectSelectField from './ProjectSelectField';
import { getDateTime } from '../../helper_functions/timeformatfunctions';
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
            this.updateTotalHours();
        }
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
            project_id
        });

        this.setState({
            task: this.props.getInitialTaskState(),
        });
    }

    updateTotalHours() {
        const { start, end } = this.state.task;
        let total = '00:00';
        if (start && end) {
            // Use break_time here when calculating total time.
            const startDate = getDateTime(start);
            const endDate = getDateTime(end);
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

    renderField(key, placeholder) {
        const { task } = this.state;
        const value = task[key];

        if (['start', 'end', 'break_time'].includes(key)){
            return (
                <HourMinuteField
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => this.handleTaskFieldChange(key, e.target.value)}
                />
            );
        }

        if (key === 'project_id'){
            return (
                <ProjectSelectField
                    projects={this.props.projects}
                    value={task.project_id}
                    onChange={(e) => this.handleTaskFieldChange(key, e.target.value)}
                />
            )
        }

        return (
            <TaskTextField
                value={value}
                onChange={(e) => this.handleTaskFieldChange(key, e.target.value)}
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
        const { classes } = this.props;
        const { task } = this.state;

        return (
            <div className={classes.taskAddingGridWrapper}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={2}>
                        <div>Task</div>
                        {this.renderField('name', 'task name')}
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
                        {this.renderField('project_id', 'project name')}
                    </Grid>
                    <Grid item xs>
                        <div>Start</div>
                        {this.renderField('start', '08:00')}
                    </Grid>
                    <Grid item xs>
                        <div>End</div>
                        {this.renderField('end', '17:00')}
                    </Grid>
                    <Grid item xs>
                        <div>Break</div>
                        {this.renderField('break_time', '00:00')}
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
