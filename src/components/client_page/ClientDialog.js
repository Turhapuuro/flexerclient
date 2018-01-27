import React, { Component } from 'react';
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

class ClientDialog extends Component {
    constructor(props) {
        super(props);

        let {client} = props;

        if (!client) {
            client = {
                name: '',
                email: '',
                phone: '',
                address: '',
                zip_code: '',
                city: '',
                business_id: '',
            }
        }

        this.state = {
            client
        }

        this.handleClientFieldChange = this.handleClientFieldChange.bind(this);
    }

    handleClientFieldChange(key, value) {
        const { client } = this.state;
        client[key] = value;
        this.setState({ client });
    }

    renderField(key, placeholder, type = 'text') {
        const { client } = this.state;
        const value = client[key];
        
        return (
            <TextField
                autoFocus={key === 'name'}
                margin="dense"
                id={key}
                value={value}
                placeholder={placeholder}
                label={key.toUpperCase()}
                type={type}
                onChange={(e) => this.handleClientFieldChange(key, e.target.value)}
                fullWidth
            />
        );
    }

    render() {
        const { classes, onSubmit, onClose } = this.props;
        const { client } = this.state;

        return (
            <div className={classes.root}>
                <Dialog
                    open={true}
                    onClose={onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit client</DialogTitle>
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
                                {this.renderField('zip_code', 'ZIP Code', 'number')}
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
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <SaveButton
                            onClick={() => onSubmit(client)}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};

ClientDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    client: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(ClientDialog);