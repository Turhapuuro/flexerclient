import React from 'react';
import { withStyles } from 'material-ui/styles';

import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';

import { red } from 'material-ui/colors';


const styles = (theme) => ({
    deleteButton: {
        color: red[500],
        height: 20,
        width: 20,
        transition: 'transform ease 0.3s',
        '&:hover': {
            transform: 'scale(1.2)',
        },
    },
});

const DeleteButton = (props) => (
    <IconButton {...props} classes={{ root: props.classes.deleteButton }}>
        <Close />
    </IconButton>
);

export default withStyles(styles, { withThem: true })(DeleteButton);
