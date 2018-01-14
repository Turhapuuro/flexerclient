import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';

import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';

import AddButton from '../common/buttons/AddButton';
import TaskTextField from '../task_page/TaskTextField';
import { gridContainer } from '../task_page/TaskPage';
import { grey } from 'material-ui/colors';
import { addProject } from '../../actions/projects';
import { navWidth } from '../navigation/Navigation';


const styles = theme => ({
    projectAddingGridWrapper: {
        width: `calc(100% - ${navWidth}px)`,
        position: 'fixed',
        zIndex: 100,
        padding: '4px 0',
        borderBottom: `1px solid ${grey[300]}`,
        boxShadow: `${grey[400]} 0px 0px 4px`,
        backgroundColor: 'white',
    },
    gridContainer: {
        ...gridContainer,
    },
    taskAddButtonCell: {
        paddingTop: '18px !important',
        textAlign: 'center',
    },
});

class ProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {}
        }

        this.handleProjectFieldChange = this.handleProjectFieldChange.bind(this);
    }

    componentWillMount() {
        this.getInitialProjectState();
    }

    handleProjectFieldChange(key, value) {
        const { project } = this.state;
        project[key] = value;
        this.setState({project})
    }

    getInitialProjectState() {
        this.setState({
            project: {
                name: '',
                description: '',
                client: '',
            }
        })
    }

    onAddProjectClick() {
        const { name, description, client} = this.state.project;

        this.props.addProject({
            name,
            description,
            client
        });

        this.getInitialProjectState();
    }

    renderField(key, placeholder) {
        const { project } = this.state;
        const value = project[key];

        return (
            <TaskTextField
                value={value}
                onChange={(e) => this.handleProjectFieldChange(key, e.target.value)}
                placeholder={placeholder}
                autoFocus={key === 'name'}
            />
        );
    }

    render() {
        const { classes, clients } = this.props;
        const { project } = this.state;

        return (
            <div className={classes.projectAddingGridWrapper}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={3}>
                        <div>Name</div>
                        {this.renderField('name', 'project name')}
                    </Grid>
                    <Grid item xs={3}>
                        <div>Description</div>
                        {this.renderField('description', 'description')}
                    </Grid>
                    <Grid item xs={3}>
                        <div>Client</div>
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
                    <Grid item xs />
                    <Grid item xs className={classes.taskAddButtonCell}>
                        <AddButton onClick={() => this.onAddProjectClick()} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProject: (project) => dispatch(addProject(project)),
    }
}

ProjectForm.propTypes = {
    classes: PropTypes.object.isRequired,
    clients: PropTypes.array.isRequired,
};

export default withStyles(styles, { withThem: true })(connect(null, mapDispatchToProps)(ProjectForm));
