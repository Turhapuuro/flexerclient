import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';

import ArrowButton from '../common/buttons/ArrowButton';


const styles = theme => ({
    monthSelectorWrapper: {
        padding: '10px 0',
        textAlign: 'center',
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

        this.state = {
            selectedMonth: MonthSelector.getInitialMonth(),
        };

        this.onMonthClick = this.onMonthClick.bind(this);
    }

    static getInitialMonth() {
        return moment().startOf("month");
    }

    componentWillMount() {
        // Launch initial monthly task data fetching here.
        const { selectedMonth } = this.state;
        this.props.requestMonthData(selectedMonth);
    }

    static getMonth(selectedMonth, functionKey) {
        // Keep the moment immutable by calling clone() before add() or subtract().
        return selectedMonth.clone()[functionKey](1, "month");
    }

    onMonthClick(functionKey) {
        let { selectedMonth } = this.state;
        selectedMonth = MonthSelector.getMonth(selectedMonth, functionKey);
        this.setState({ selectedMonth });
        this.props.requestMonthData(selectedMonth);
    }

    render() {
        const { classes } = this.props;
        const { selectedMonth } = this.state;
        const previousMonth = MonthSelector.getMonth(selectedMonth, 'subtract');
        const nextMonth = MonthSelector.getMonth(selectedMonth, 'add');

        return (
            <div className={classes.monthSelectorWrapper}>
                <ArrowButton
                    direction='left'
                    label={previousMonth.format('MMMM YYYY')}
                    onClick={() => this.onMonthClick('subtract')}
                />
                <span className={classes.currentMonthWrapper}>
                    {selectedMonth.format('MMMM')}
                </span>
                <ArrowButton
                    direction='right'
                    label={nextMonth.format('YYYY MMMM')}
                    onClick={() => this.onMonthClick('add')}
                />
            </div>
        )
    }
}

MonthSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withThem: true })(MonthSelector);

