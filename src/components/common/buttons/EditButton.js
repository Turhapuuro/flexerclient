import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Create from 'material-ui-icons/Create';
import { green } from 'material-ui/colors';


const styles = (theme) => ({
    editButton: {
        color: green[400],
        height: 20,
        width: 20,
        transition: 'transform ease 0.3s',
        '&:hover': {
            transform: 'scale(1.2)',
        },
    },
});

const EditButton = (props) => (
    <IconButton {...props} classes={{ root: props.classes.editButton }}>
        <Create />
    </IconButton>
);

EditButton.propTypes = {
    onClick: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withThem: true })(EditButton);