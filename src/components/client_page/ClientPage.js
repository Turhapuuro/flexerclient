import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProjects } from '../../actions/projects';
import { fetchClients, addClient, editClient, deleteClient } from '../../actions/clients';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Table, { TableBody, TableRow, TableCell } from 'material-ui/Table';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';

import PageContainer from '../common/PageContainer';
import DeleteButton from '../common/buttons/DeleteButton';
import EditButton from '../common/buttons/EditButton';
import ClientDialog from '../client_page/ClientDialog';


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
    }
});

class ClientPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: null,
            open: false,
            editableClient: null,
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.onAddClientClick = this.onAddClientClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onSaveEditedClient = this.onSaveEditedClient.bind(this);
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    handleCancel() {
        this.setState({
            expanded: null,
        });
    }

    componentWillMount() {
        this.props.fetchProjects();
        this.props.fetchClients();
    }

    getClientProjects(projects, clientId) {
        return projects.filter((project) => (project.client === clientId));
    }

    onAddClientClick(client) {
        this.props.addClient(client);
        this.toggleModal(false);
    }

    toggleModal(open, editableClient = null) {
        this.setState({
            open,
            editableClient
        });
    }

    onSaveEditedClient(client) {
        this.props.editClient(client);
        this.toggleModal(false);
    }

    render() {
        const { classes, clients, projects, deleteClient } = this.props;
        const { expanded, editableClient, open } = this.state;
        let clientDialog = null;

        if (open) {
            clientDialog = (
                <ClientDialog
                    client={editableClient}
                    onClose = {() => this.toggleModal(false) }
                    onSubmit={editableClient ? this.onSaveEditedClient : this.onAddClientClick}
                    title={editableClient ? 'Edit Client' : 'Add Client'}
                />
            );
        }

        return (
            <PageContainer className={classes.root}>
                {clientDialog}
                <Button onClick={() => this.toggleModal(true)}>Add Client</Button>
                {clients.map(client => {
                    const clientProjects = this.getClientProjects(projects, client.id);

                    return (
                        <ExpansionPanel
                            key={client.id} 
                            expanded={expanded === client.id} 
                            onChange={this.handleChange(client.id)}
                        >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Grid container spacing={Number(40)} justify='space-around'>
                                    <Grid item >{client.name}</Grid>
                                    <Grid item >{client.email}</Grid>
                                    <Grid item >
                                        <EditButton 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.toggleModal(true, client);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item >
                                        <DeleteButton
                                            onClick={(e) => {
                                                // Prevent <Grid container> toggleTaskEdit function from launching.
                                                e.stopPropagation();
                                                deleteClient(client.id);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table>
                                    <TableBody>
                                        {clientProjects.map((project) => {
                                            return (
                                                <TableRow
                                                    key={project.id}
                                                > 
                                                    <TableCell>
                                                        {project.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {project.description}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
                
            </PageContainer>
        )
    }
}

ClientPage.propTypes = {
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
        addClient: (client) => dispatch(addClient(client)),
        deleteClient: (id) => dispatch(deleteClient(id)),
        editClient: (editedClient) => dispatch(editClient(editedClient)),
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(ClientPage));
