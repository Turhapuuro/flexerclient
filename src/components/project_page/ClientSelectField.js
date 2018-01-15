import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const styles = theme => ({
    selectField: {

    },
})

const ClientSelectField = (props) => {
    const { onChange, project, clients} = props;

    return (
        <Select
            value={project.client}
            name="client"
            fullWidth={true}
            onChange={onChange}
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
    );
}

ClientSelectField.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(ClientSelectField);