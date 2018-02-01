import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Dialog, {
    DialogTitle,
} from 'material-ui/Dialog';
import ClientDialog from '../client_page/ClientDialog';
import ProjectDialog from '../project_page/ProjectDialog';


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
    const { onClose, classes, title, isClient } = props;

    return (
        <div className={classes.root}>
            <Dialog
                open={true}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                { isClient ? (
                    <ClientDialog {...props} />
                ) : (
                    <ProjectDialog {...props} />
                )}
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