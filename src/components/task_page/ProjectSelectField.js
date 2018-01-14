import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const styles = theme => ({
    selectField: {

    },
})

const ProjectSelectField = (props) => {
    const {value, onChange} = props;

    return (
            <Select 
                value={value} 
                name="project_id" 
                onChange={onChange}
                fullWidth={true}
                //renderValue={value => value}
            >
                <MenuItem
                    value=""
                    key="empty_select"
                >
                    None
                </MenuItem>
                {props.projects.map(project => (
                    <MenuItem 
                        value={project.id}
                        key={project.id}
                    >
                        {project.name}
                    </MenuItem>
                ))}
            </Select>
    )
}

ProjectSelectField.propTypes = {
    classes: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default withStyles(styles, { withThem: true })(ProjectSelectField);
