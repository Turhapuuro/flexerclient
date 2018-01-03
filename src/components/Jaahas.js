import React, {Component}from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {fetchTasks} from '../actions/tasks';
import moment from 'moment';

import Button from 'material-ui/Button';
import Close from 'material-ui-icons/Close';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';

import { blue, green, grey } from 'material-ui/colors';


const styles = theme => ({
    listElement: {
        backgroundColor: blue[500],
        borderBottom: `1px solid ${grey[300]}`,
        // margin: '0 -8px',
    },
    testButton: {
        color: green[500],
    },
    weekDay: {
        textAlign: 'left',
    },
});

class Jaahas extends Component{
    componentWillMount() {
        this.props.fetchTasks();
    }

    formatHours(date) {
        return moment(date).format('hh:mm');
    }

    getWeekDay(date) {
        return moment(date).format('dddd');
    }

    render(){
        const { tasks, classes } = this.props;
        console.log(tasks);

        return (
            <div style={{ padding: 8 }}>
                <Button
                    onClick={this.fetchTasks}
                    label="Matias"
                    labelPosition="before"
                    primary={true}
                    classes={{ root: classes.testButton }}
                >
                    <Close />
                </Button>
                <Divider />
                <Grid container>
                    <Grid item xs>Task</Grid>
                    <Grid item xs>Date</Grid>
                    <Grid item xs>Start</Grid>
                    <Grid item xs>End</Grid>
                    <Grid item xs>Break</Grid>
                    <Grid item xs>Hours</Grid>
                </Grid>
                {tasks && tasks.map(task => (
                    // name
                    // start_date
                    // end_date
                    // break_time
                    // total_hours
                    <div>
                        <div className={classes.weekDay}>{this.getWeekDay(task.start_date)}</div>
                        <Grid
                            container
                            key={task.name}
                        >
                            <Grid item xs>{task.name}</Grid>
                            <Grid item xs />
                            <Grid item xs>{this.formatHours(task.start_date)}</Grid>
                            <Grid item xs>{this.formatHours(task.end_date)}</Grid>
                            <Grid item xs>{task.break_time}</Grid>
                            <Grid item xs>{task.total_hours}</Grid>
                        </Grid>
                    </div>
                ))}
            </div>
        )
    }
}

Jaahas.propTypes = {
    tasks: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    // function: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    tasks: state.tasksStore.tasks,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: () => dispatch(fetchTasks())
    }
}

// export default connect(mapStateToProps, mapDispatchToProps) (Jaahas);
export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(Jaahas));
