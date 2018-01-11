import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
import { fetchProjects } from '../../actions/projects';
import { fetchClients } from '../../actions/clients';
import { withStyles } from 'material-ui/styles';

import Table, { TableHead, TableBody, TableRow, TableCell } from 'material-ui/Table';

import PageContainer from '../common/PageContainer';

// import { getDate } from '../../helper_functions/timeformatfunctions';
// import { blue, grey } from 'material-ui/colors';


const styles = theme => ({
    // Add component styles here.
});

class ProjectPage extends Component {
    componentWillMount() {
        this.props.fetchProjects();
        this.props.fetchClients();
    }

    getClientName(clients, clientId) {
        const client = clients.find((client) => (client.id === clientId));
        return client ? client.name : <i>Undefined client</i>;
    }

    render() {
        const { projects, clients } = this.props;

        return (
            <PageContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(({ id, name, client_id }) => (
                            <TableRow key={id}>
                                <TableCell>{name}</TableCell>
                                <TableCell>{this.getClientName(clients, client_id)}</TableCell>
                                <TableCell>project description</TableCell>
                            </TableRow>
                        ))}
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
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(ProjectPage));
