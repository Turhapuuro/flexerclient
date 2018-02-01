import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
                    {Object.keys(projectData).map((projectName) => {
                        const totalHours = moment.duration(projectData[projectName], 'hours');
                        return (
                            <TableRow key={projectName}>
                                <TableCell>
                                    {projectName}
                                </TableCell>
                                <TableCell>
                                    {totalHours._data.hours + ' h ' + totalHours._data.minutes + ' min'}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        );
    }
}

ProjectTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withThem: true })(ProjectTable);
