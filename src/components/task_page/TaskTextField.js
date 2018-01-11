import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';


const styles = theme => ({
    // Styles for task TextField component.
    taskField: {
    },
    // Styles for task Input component which renders in TextField.
    taskFieldInput: {
        padding: '5px 0 3px',
    },
});

const TaskTextField = (props) => {
    const { classes, onChange, value, placeholder, autoFocus = false } = props;

    return (
        <TextField
            placeholder={placeholder}
            classes={{ root: classes.taskField }}
            value={value}
            onChange={onChange}
            InputProps={{ className: classes.taskFieldInput }}
            multiline={true}
            autoFocus={autoFocus}
        />
    );
}

TaskTextField.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

export default withStyles(styles, { withThem: true })(TaskTextField);
