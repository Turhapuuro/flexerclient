import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableHead, TableBody, TableRow, TableCell } from 'material-ui/Table';


const styles = (theme) => ({
    projectTable: {
        maxWidth: 500,
    },
});

class ProjectTable extends Component {
    render() {
        const { classes, projectData } = this.props;

        return (
            <Table className={classes.projectTable}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Project
                        </TableCell>
                        <TableCell>
                            Total Hours
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(projectData).map((projectName) => (
                        <TableRow key={projectName}>
                            <TableCell>
                                {projectName}
                            </TableCell>
                            <TableCell>
                                {projectData[projectName]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}

ProjectTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withThem: true })(ProjectTable);
