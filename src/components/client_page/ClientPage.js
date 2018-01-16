import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
import { fetchProjects } from '../../actions/projects';
import { fetchClients, deleteClient } from '../../actions/clients';
import { withStyles } from 'material-ui/styles';

import Table, { TableHead, TableBody, TableRow, TableCell } from 'material-ui/Table';

import PageContainer from '../common/PageContainer';
import DeleteButton from '../common/buttons/DeleteButton';

// import { getDate } from '../../helper_functions/timeformatfunctions';
import { blue } from 'material-ui/colors';


const styles = theme => ({
    clientRow: {
        backgroundColor: blue[500],
    },
    projectRow: {
        backgroundColor: blue[100],
    },
});

class ClientPage extends Component {
    componentWillMount() {
        this.props.fetchProjects();
        this.props.fetchClients();
    }

    getClientProjects(projects, clientId) {
        return projects.filter((project) => (project.client_id === clientId));
    }

    render() {
        const { classes, clients, projects, deleteClient } = this.props;

        return (
            <PageContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    {clients.map(({ id, name }) => {
                        const clientProjects = this.getClientProjects(projects, id);
                        return (
                            <TableBody key={id} className={classes.tableBody}>
                                <TableRow className={classes.clientRow}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>client description</TableCell>
                                    <TableCell>
                                        <DeleteButton 
                                            onClick={(e) => {
                                                // Prevent <Grid container> toggleTaskEdit function from launching.
                                                e.stopPropagation();
                                                deleteClient(id);
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                {clientProjects.map((project) => (
                                    <TableRow key={project.id} className={classes.projectRow}>
                                        <TableCell>{project.name}</TableCell>
                                        <TableCell />
                                    </TableRow>
                                ))}
                            </TableBody>
                        );
                    })}
                </Table>
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
        deleteClient: (id) => dispatch(deleteClient(id)),
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(ClientPage));
