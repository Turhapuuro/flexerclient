import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import DialogContainer from '../common/DialogContainer';


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
                type={type}
                onChange={(e) => this.handleClientFieldChange(key, e.target.value)}
                fullWidth
            />
        );
    }

    render() {
        const { client } = this.state;
        const { onSubmit, onClose, title } = this.props;

        return (
            <DialogContainer
                onClose={onClose}
                onSubmit={() => onSubmit(client)}
                title={title}
            >
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        {this.renderField('name', 'Name')}
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
            </DialogContainer>
        );
    }
};

ClientDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    client: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(ClientDialog);