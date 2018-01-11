import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { grey } from 'material-ui/colors';


const buttonStyle = {
    width: 190,
    display: 'inline-block',
    paddingBottom: 2,
    color: grey[400],
    '&:hover': {
        backgroundColor: 'transparent',
        color: grey[700],
    },
    '&:focus': {
        outline: 'none',
    },
};

const styles = (theme) => ({
    leftButton: {
        ...buttonStyle,
        textAlign: 'right',
    },
    rightButton: {
        ...buttonStyle,
        textAlign: 'left',
    },
    buttonLabel: {
        // Hacky fix, to align label with icon.
        position: 'relative',
        top: -7,
    },
    leftIcon: {
        // marginLeft: 2,
    },
    rightIcon: {
        // marginLeft: 10,
    },
});

const ArrowButton = (props) => {
    const { classes, onClick, direction, label } = props;
    const buttonRootClass = direction === 'left' ? classes.leftButton : classes.rightButton;
    return (
        <Button onClick={onClick} classes={{ root: buttonRootClass }}>
            {direction === 'left' ? <span className={classes.buttonLabel}>{label}</span> : ''}
            {direction === 'left' ?
            <KeyboardArrowLeft className={classes.leftIcon}/> :
            <KeyboardArrowRight className={classes.rightIcon}/>}
            {direction === 'right' ? <span className={classes.buttonLabel}>{label}</span> : ''}
        </Button>
    );
};

ArrowButton.propTypes = {
    classes: PropTypes.object.isRequired,
    direction: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default withStyles(styles, { withThem: true })(ArrowButton);
