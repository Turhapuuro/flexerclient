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

import PageContainer from '../common/PageContainer';
import DeleteButton from '../common/buttons/DeleteButton';
import AddClientDialog from './AddClientDialog';
import EditButton from '../common/buttons/EditButton';
import EditClientDialog from './EditClientDialog';


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

// const styles = theme => ({
//     clientRow: {
//         backgroundColor: blue[500],
//     },
//     projectRow: {
//         backgroundColor: blue[100],
//     },
// });

class ClientPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: null,
            client: {
                name: '',
                email: '',
                phone: '',
                address: '',
                zip_code: '',
                city: '',
                business_id: '',
            },
            adding: false,
            editing: false,
            editableClient: null,
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleClientFieldChange = this.handleClientFieldChange.bind(this);
        this.onAddClientClick = this.onAddClientClick.bind(this);
        this.setEditableClient = this.setEditableClient.bind(this);
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
        })
    }

    handleClientFieldChange(key, value) {
        if(this.state.editableClient) {
            const { editableClient } = this.state;
            editableClient[key] = value;
            this.setState({ editableClient })
        } else {
            const { client } = this.state;
            client[key] = value;
            this.setState({ client })
        } 
    };

    componentWillMount() {
        this.props.fetchProjects();
        this.props.fetchClients();
    }

    getClientProjects(projects, clientId) {
        return projects.filter((project) => (project.client === clientId));
    }

    onAddClientClick() {
        this.props.addClient(this.state.client);
        this.toggleModal();
    }

    toggleModal(key) {
        // FIX: IF CLICK TO EDIT A CLIENT THEN CLOSE THE MODAL AND TRY TO ADD A CLIENT
        // TYPING IN THE ADD CLIENT MODAL DOESN'T WORK
        this.setState({
            [key]: !this.state[key]
        });
    }

    onSaveEditedClient() {
        this.props.editClient(this.state.editableClient);
        this.setState({
            editing: false,
            editableClient: null
        })
    }

    setEditableClient(client) {
        this.setState({
            editing: !this.state.editing,
            editableClient: {...client}
        });
    }

    render() {
        const { classes, clients, projects, deleteClient } = this.props;
        const { expanded, client, editing, editableClient, adding } = this.state;
        let editingForm = null;

        if (editableClient) {
            editingForm = <EditClientDialog 
                                client={editableClient}
                                onChange={this.handleClientFieldChange}
                                onSaveEditedClient={this.onSaveEditedClient}
                                open={editing}
                                toggleModal={this.toggleModal}
                            />
        }

        return (
            <PageContainer className={classes.root}>
                {editingForm}
                <AddClientDialog
                    open={adding}
                    toggleModal={this.toggleModal}
                    client={client}
                    onChange={this.handleClientFieldChange}
                    onAddClientClick={this.onAddClientClick}
                />
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
                                                this.setEditableClient(client);
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
                            {editingForm}
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
