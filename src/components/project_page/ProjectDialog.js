import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

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
    // Check Units and measurements on Material Desing website
    textarea: {
        border: '1px solid rgba(0,0,0,0.42)',
        borderRadius: '2px'
    },
});

class ProjectDialog extends Component {
    constructor(props) {
        super(props);

        let { project } = props;

        if (!project) {
            project = {
                name: '',
                description: '',
                client: '',
            }
        }

        if (!project.client){
            project.client = '';
        }

        this.state = {
            project,
        };

        this.handleProjectFieldChange = this.handleProjectFieldChange.bind(this);
    }

    static requiredFields = {
        name: {
            defaultError: 'Project name is required.',
            minCharLength: 5,
            customError: 'Project name should be at least 5 characters long.',
        },
    };

    handleProjectFieldChange(key, value) {
        const { project } = this.state;
        project[key] = value;
        this.setState({ project });
    }

    static checkForError(key, value) {
        const { requiredFields } = ProjectDialog;
        const requiredFieldKeys = Object.keys(requiredFields);
        const isRequiredField = requiredFieldKeys.includes(key);

        if (!isRequiredField) {
            return { isError: false, helperText: '' };
        }

        const isDefaultError = !value.length;
        const isCustomError = requiredFields[key].minCharLength > value.length;
        const isError = isDefaultError || isCustomError;

        let helperText = '';
        if (isError) {
            helperText = isDefaultError ? requiredFields[key].defaultError : requiredFields[key].customError;
        }

        return { isError, helperText };
    }

    renderField(key, placeholder, type = 'text') {
        const { project } = this.state;
        const { classes } = this.props;
        const value = project[key];

        const { isError, helperText } = ProjectDialog.checkForError(key, value);

        let fieldAttributes = {
            value,
            placeholder,
            type,
            helperText,
            error: isError,
            fullWidth: true,
            margin: 'dense',
            onChange: (e) => this.handleProjectFieldChange(key, e.target.value),
            autoFocus: (key === 'name'),
        };

        if (key === 'description'){
            fieldAttributes = {
                ...fieldAttributes,
                multiline: true,
                rows: 4,
                className: classes.textarea,
            }
        }

        return <TextField {...fieldAttributes} />;
    }

    render() {
        const { onClose, onSubmit, clients, title } = this.props;
        const { project } = this.state;

        return (
            <DialogContainer
                onClose={onClose}
                onSubmit={() => onSubmit(project)}
                title={title}
            >
                <Grid container>
                    <Grid item xs={12}>
                        {this.renderField('name', 'Project name')}
                    </Grid>
                    <Grid item xs={12}>
                        {this.renderField('description', 'Enter description...')}
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            value={project.client}
                            name="client"
                            fullWidth={true}
                            onChange={(e) => this.handleProjectFieldChange('client', e.target.value)}
                        >
                            <MenuItem
                                value=""
                                key="empty_select"
                            >
                                None
                            </MenuItem>
                            {clients.map(client => (
                                <MenuItem
                                    value={client.id}
                                    key={client.id}
                                >
                                    {client.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </DialogContainer>
        );
    }
};

ProjectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    client: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(ProjectDialog);