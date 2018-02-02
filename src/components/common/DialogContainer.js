import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import SaveButton from '../common/buttons/SaveButton';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    clientCell: {
        display: 'inline'
    },
});

const DialogContainer = (props) => {
    const { classes, onClose, onSubmit, title } = props;

    return (
        <div className={classes.root}>
            <Dialog
                open={true}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        {props.children}
                    </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                            </Button>
                    <SaveButton
                        onClick={onSubmit}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

DialogContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    clients: PropTypes.array,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
    
export default withStyles(styles, { withThem: true })(DialogContainer);