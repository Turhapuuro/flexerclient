import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProjects, addProject, deleteProject, editProject } from '../../actions/projects';
import { fetchClients } from '../../actions/clients';
import { withStyles } from 'material-ui/styles';

import Table, { TableHead, TableBody, TableRow, TableCell } from 'material-ui/Table';
import Button from 'material-ui/Button';

import PageContainer from '../common/PageContainer';
import DeleteButton from '../common/buttons/DeleteButton';
import EditButton from '../common/buttons/EditButton';
import { orange } from 'material-ui/colors';
import ProjectDialog from '../project_page/ProjectDialog';


const styles = theme => ({
    // Add component styles here.
    projectContainer: {
        margin: '84px 0 48px',
    },
    projectGridContainer: {
        cursor: 'pointer',
        height: 52,
        paddingTop: 4,
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: orange[100],
        }
    },
    addProjectButton: {
        color: '#4caf50',
        border: '1px solid #4caf50',
    }
});

class ProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editableProject: null,
            open: false
        };
        
        this.renderRow = this.renderRow.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSaveProjectClick = this.onSaveProjectClick.bind(this);
        this.onAddProjectClick = this.onAddProjectClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        this.props.fetchProjects();
        this.props.fetchClients();
    }

    getClientName(clients, clientId) {
        const client = clients.find((client) => (client.id === clientId));
        return client ? client.name : <i>Undefined client</i>;
    }

    onFieldChange(key, value) {
        const { editableProject } = this.state;
        editableProject[key] = value;
        this.setState({ editableProject });
    }

    onAddProjectClick(project) {
        this.props.addProject(project);
        this.toggleModal(false);
    }

    onSaveProjectClick(project) {
        this.props.editProject(project);
        this.toggleModal(false);
    }

    renderRow( project) {
        const { classes, clients, deleteProject } = this.props;

        return (
            <TableRow
                key={project.id}
                className={classes.projectGridContainer}
            >
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{this.getClientName(clients, project.client)}</TableCell>
                <TableCell>
                    <EditButton 
                        onClick={(e) => {
                            e.stopPropagation();
                            this.toggleModal(true, project);
                        }}
                    />
                </TableCell>
                <TableCell>
                    <DeleteButton
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                        }}
                    />
                </TableCell>
            </TableRow>
        );
    }

    toggleModal(open, editableProject = null) {
        this.setState({
            open,
            editableProject
        });
    }

    render() {
        const { projects, clients, classes } = this.props;
        const { editableProject, open } = this.state;
        let projectDialog = null;

        if (open) {
            projectDialog = (
                <ProjectDialog
                    clients={clients}
                    title={editableProject ? 'Edit Project' : 'Add Project'}
                    onClose={() => this.toggleModal(false)}
                    onSubmit={editableProject ? this.onSaveProjectClick : this.onAddProjectClick}
                    project={editableProject}
                />
            )
        }

        return (
            <PageContainer>
                {projectDialog}
                <Button classes={{ root: classes.addProjectButton }} onClick={() => this.toggleModal(true)}>
                    Add Project
                </Button>
                <Table className={classes.projectContainer}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(project => {
                            return this.renderRow(project)
                        })}
                    </TableBody>
                </Table>
            </PageContainer>
        )
    }
}

ProjectPage.propTypes = {
    classes: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    clients: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    projects: state.projectStore.projects,
    clients: state.clientStore.clients,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: () => dispatch(fetchProjects()),
        fetchClients: () => dispatch(fetchClients()),
        addProject: (project) => dispatch(addProject(project)),
        deleteProject: (id) => dispatch(deleteProject(id)),
        editProject: (editedProject) => dispatch(editProject(editedProject)),
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(ProjectPage));
