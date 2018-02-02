import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { addProject } from '../../actions/projects';

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
            this.state = {
                project: {
                    name: '',
                    description: '',
                    client: '',
                }
            }
        }

        this.handleProjectFieldChange = this.handleProjectFieldChange.bind(this);
        this.onAddProjectClick = this.onAddProjectClick.bind(this);
    }

    handleProjectFieldChange(key, value) {
        const { project } = this.state;
        project[key] = value;
        this.setState({ project });
    }

    onAddProjectClick() {
        const { name, description, client } = this.state.project;

        this.props.addProject({
            name,
            description,
            client
        });

        this.setState({
            project: {
                name: '',
                description: '',
                client: '',
            }
        });

        this.props.onClose();
    }

    renderField(key, placeholder, type = 'text') {
        const { project } = this.state;
        const { classes } = this.props;
        const value = project[key];

        if (key === 'description'){
            return (
                <TextField
                    margin="dense"
                    id={key}
                    value={value}
                    placeholder={placeholder}
                    type={type}
                    onChange={(e) => this.handleProjectFieldChange(key, e.target.value)}
                    fullWidth
                    multiline
                    rows="4"
                    className={classes.textarea}
                />
            )
        }

        return (
            <TextField
                autoFocus={key === 'name'}
                margin="dense"
                id={key}
                value={value}
                placeholder={placeholder}
                type={type}
                onChange={(e) => this.handleProjectFieldChange(key, e.target.value)}
                fullWidth
            />
        );
    }

    render() {
        const { onClose, clients, title } = this.props;
        const { project } = this.state;

        return (
            <DialogContainer
                onClose={onClose}
                onSubmit={this.onAddProjectClick}
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

const mapDispatchToProps = (dispatch) => {
    return {
        addProject: (project) => dispatch(addProject(project)),
    }
}

export default withStyles(styles, { withThem: true })(connect(null, mapDispatchToProps)(ProjectDialog));