import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const styles = theme => ({
    selectField: {

    },
})

const SelectField = (props) => {
    const { value, onChange, options } = props;

    return (
        <Select
            value={value}
            name="project_id"
            onChange={onChange}
            fullWidth={true}
        >
            <MenuItem
                value=""
                key="empty_select"
            >
                None
                </MenuItem>
                {options()}
        </Select>
    )
}

SelectField.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.func.isRequired,
};

export default withStyles(styles, { withThem: true })(SelectField);