import React from 'react';
import { withStyles } from 'material-ui/styles';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const styles = (theme) => ({
    taskDatePicker: {
        backgroundColor: 'transparent',
        border: 0,
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        paddingBottom: 2,
        marginTop: 4,
        // width: 100,
        '&:hover': {
            borderBottom: '2px solid black',
            paddingBottom: 1,
        },
        '&:focus': {
            outline: 'none',
            borderBottom: '2px solid blue',
            paddingBottom: 1,
        },
    },
});

const TaskDatePicker = (props) => {
    const { classes, value, onChange } = props;

    return (
        <DatePicker
            dateFormat='DD/MM/YYYY'
            className={classes.taskDatePicker}
            selected={value}
            onChange={(date) => onChange(date)}
        />
    );
};

export default withStyles(styles, { withThem: true })(TaskDatePicker);
