import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';

import { gridContainer } from './TaskPage';
import {getDateTime} from '../../helper_functions/timeformatfunctions';
import { grey } from 'material-ui/colors';
import AddButton from '../common/buttons/AddButton';
import NumberFormatCustom from './NumberFormatCustom';


const styles = theme => ({
    taskAddingGridWrapper: {
        padding: 10,
        borderBottom: `1px solid ${grey[300]}`,
        boxShadow: `${grey[400]} 1px 1px 5px`,
    },
    gridContainer: {
        ...gridContainer,
    },
});

class TaskForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: props.getInitialTaskState(),
        };

        this.handleTaskFieldChange = this.handleTaskFieldChange.bind(this);
    }

    handleTaskFieldChange(key, value) {
        const { task } = this.state;
        task[key] = value;
        this.setState({ task });
        if (['start', 'end'].includes(key)) {
            this.updateTotalHours();
        }
    }

    onAddTaskClick() {
        const { name, start, end, total } = this.state.task;

        // Expected API date format "2018-01-04T16:44:14.051000Z"
        const start_date = getDateTime(start);
        const end_date = getDateTime(end);

        this.props.addTask({
            name,
            start_date,
            end_date,
            break_time: '00:00',
            total_hours: total,
        });

        this.setState({
            task: this.props.getInitialTaskState(),
        });
    }

    updateTotalHours() {
        const { start, end } = this.state.task;
        let total = '00:00';
        if (start && end) {
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
        const { classes } = this.props;
        const { task} = this.state;

        const value = task[key];

        if (['start', 'end', 'break'].includes(key)){
            return (
                <Input 
                    name={key}
                    placeholder={placeholder}
                    value={value}
                    inputComponent={NumberFormatCustom}
                    inputProps={{'placeholder':placeholder}}
                    onChange={(e) => this.handleTaskFieldChange(key, e.target.value)}
                />
            )
        }
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

    render() {
        const {classes} = this.props;
        const {task} = this.state;

        return (
            <div className={classes.taskAddingGridWrapper}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={2}>
                        <div>Task</div>
                        {this.renderField('name', 'task name')}
                    </Grid>
                    <Grid item xs={2}>
                        <div>Date</div>
                        {this.renderField('date', 'date')}
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
                        {this.renderField('break', '00:00')}
                    </Grid>
                    <Grid item xs>
                        <div>Hours</div>
                        {task.total}
                    </Grid>
                    <Grid item xs />
                    <Grid item xs>
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
