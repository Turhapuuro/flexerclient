import React from 'react';
import { withStyles } from 'material-ui/styles';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const styles = (theme) => ({
    taskDatePicker: {
        backgroundColor: 'transparent',
        border: 0,
        borderBottom: '1px solid black',
        marginTop: 8,
        paddingBottom: 2,
        '&:hover': {
            borderBottom: '2px solid black',
        },
        '&:focus': {
            outline: 'none',
            borderBottom: '2px solid blue',
        },
    },
});

const TaskDatePicker = (props) => {
    const { classes, value, onChange } = props;

    return (
        <DatePicker
            dateFormat='DD.MM.YYYY'
            className={classes.taskDatePicker}
            selected={value}
            onChange={(date) => onChange(date)}
        />
    );
};

export default withStyles(styles, { withThem: true })(TaskDatePicker);
