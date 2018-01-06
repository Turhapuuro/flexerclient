import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { green } from 'material-ui/colors';


const styles = (theme) => ({
    addButton: {
        color: green[500],
        height: 20,
        width: 20,
        transition: 'transform ease 0.3s',
        '&:hover': {
            transform: 'scale(1.2)',
        },
    },
});

const AddButton = (props) => (
    <Button {...props} classes={{ root: props.classes.addButton }}>
        Add
    </Button>
);

AddButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withThem: true })(AddButton);
