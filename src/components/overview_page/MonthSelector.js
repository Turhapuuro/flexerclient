import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
// import { fetchTasks, addTask, editTask, deleteTask } from '../../actions/tasks';
import { withStyles } from 'material-ui/styles';

import ArrowButton from '../common/buttons/ArrowButton';


const styles = theme => ({
    monthSelectorWrapper: {
        padding: '10px 0',
    },
    currentMonthWrapper: {
        textAlign: 'center',
        display: 'inline-block',
        width: 100,
        position: 'relative',
        top: -7,
        fontSize: 20,
        cursor: 'default',
    },
});

class MonthSelector extends Component {
    constructor() {
        super();

        const selectedMonth = moment().startOf("month");

        this.state = {
            selectedMonth,
        };
    }

    componentWillMount() {
        // this.props.fetchOverviewTasks();
    }

    getPreviousMonth(selectedMonth) {
        // Keep the moment immutable by calling clone() before substract().
        return selectedMonth.clone().subtract(1, "month");
    }

    getNextMonth(selectedMonth) {
        // Keep the moment immutable by calling clone() before add().
        return selectedMonth.clone().add(1, "month");
    }

    onMonthClick(monthIsIncremented) {
        let { selectedMonth } = this.state;
        if (monthIsIncremented) {
            selectedMonth = this.getNextMonth(selectedMonth);
        } else {
            selectedMonth = this.getPreviousMonth(selectedMonth);
        }
        this.setState({ selectedMonth });
    }

    render() {
        const { classes } = this.props;
        const { selectedMonth } = this.state;
        const previousMonth = this.getPreviousMonth(selectedMonth);
        const nextMonth = this.getNextMonth(selectedMonth);

        return (
            <div className={classes.monthSelectorWrapper}>
                <ArrowButton
                    direction='left'
                    label={previousMonth.format('MMMM YYYY')}
                    onClick={() => this.onMonthClick(false)}
                />
                <span className={classes.currentMonthWrapper}>
                    {selectedMonth.format('MMMM')}
                </span>
                <ArrowButton
                    direction='right'
                    label={nextMonth.format('YYYY MMMM')}
                    onClick={() => this.onMonthClick(true)}
                />
            </div>
        )
    }
}

MonthSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    // tasks: state.taskStore.tasks,
})

const mapDispatchToProps = (dispatch) => {
    return {
        // this.props.fetchOverviewTasks();
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(MonthSelector));

