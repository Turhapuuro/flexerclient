import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
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

class AddClientDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        //this.setState({ open: true });
        this.props.toggleModal('adding');
    };

    handleClose = () => {
        this.props.toggleModal('adding');
    };

    renderField(key, placeholder) {
        const { onChange, client } = this.props;
        const value = client[key];

        return (
            <TextField
                autoFocus
                margin="dense"
                id={key}
                value={value}
                placeholder={placeholder}
                label={key.toUpperCase()}
                type="text"
                onChange={(e) => onChange(key, e.target.value)}
                fullWidth
            />
        )
    }

    render() {
        const { classes, onAddClientClick, open } = this.props;

        return (
            <div className={classes.root}>
                <Button onClick={this.handleOpen}>Add Client</Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add new client</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                {this.renderField('name')}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {this.renderField('email', 'Email Address')}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {this.renderField('phone', 'Phone Number')}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {this.renderField('address', 'Street Address')}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {this.renderField('zip_code', 'ZIP Code')}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {this.renderField('city', 'City')}
                            </Grid>
                            <Grid item xs={12}>
                                {this.renderField('business_id', 'Business ID')}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <SaveButton
                            onClick={onAddClientClick}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

AddClientDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onAddClientClick: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(AddClientDialog);