import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { TableRow, TableCell } from 'material-ui/Table';

import SaveButton from '../common/buttons/SaveButton';
import DeleteButton from '../common/buttons/DeleteButton';
import TaskTextField from '../task_page/TaskTextField';
import ClientSelectField from './ClientSelectField';

import {gridContainer} from '../task_page/TaskPage';
import { orange } from 'material-ui/colors';

const styles = (theme) => ({
    editableProjectRow: {
        ...gridContainer,
        height: 52,
        backgroundColor: orange[200],
    },
});

const EditableProjectRow = (props) => {
    const { classes, project, clients, onChange, onClick, deleteProject } = props;

    return (
       <TableRow className={classes.editableProjectRow}
            onClick={(e) => {
                e.stopPropagation();
            }}
       >
            <TableCell>
                <TaskTextField
                    value={project.name}
                    name="name"
                    onChange={(e) => onChange("name", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <TaskTextField
                    value={project.description}
                    name="description"
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <ClientSelectField
                    project={project}
                    clients={clients}
                    onChange={(e) => onChange("client", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <SaveButton onClick={onClick}/>
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

EditableProjectRow.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    clients: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
};

export default withStyles(styles, {withThem: true}) (EditableProjectRow);