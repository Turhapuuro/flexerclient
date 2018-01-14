import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
// import { fetchTasks, addTask, editTask, deleteTask } from '../../actions/tasks';
import { withStyles } from 'material-ui/styles';

import PageContainer from '../common/PageContainer';
import MonthSelector from './MonthSelector';
import TaskBarChart from './TaskBarChart';
import ProjectTable from './ProjectTable';

import { getRandomizedMonthlyProjectData } from './mock_task_data';


const styles = theme => ({
    // Add component styles here.
});

class OverviewPage extends Component {
    constructor() {
        super();

        this.state = {
            mockData: getRandomizedMonthlyProjectData(),
        };
        this.getMonthTaskData = this.getMonthTaskData.bind(this);
    }

    getProjectTableData(data) {
        const projectTableData = {};
        data.forEach((dataObj) => {
            Object.keys(dataObj).forEach((key) => {
                // Collect all project names found in the data.
                if (!['date', 'total'].includes(key)) {
                    let total = projectTableData[key] && projectTableData[key].total
                                ? projectTableData[key].total + dataObj[key] : dataObj[key];
                    projectTableData[key] = { total };
                }
            });
        });

        return projectTableData;
    }

    getMonthTaskData(date) {
        // Fetch monthly task data here.
        console.log(date);

        // Change mockData to this.props.data when backend serves API data via redux.
        const dayCount = date.daysInMonth();
        const mockData = getRandomizedMonthlyProjectData(dayCount);
        this.setState({ mockData });
    }

    render() {
        const { mockData } = this.state;

        return (
            <PageContainer>
                <MonthSelector requestMonthData={this.getMonthTaskData} />
                <TaskBarChart data={mockData} />
                <ProjectTable projectData={this.getProjectTableData(mockData)} />
            </PageContainer>
        )
    }
}

OverviewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    // tasks: state.taskStore.tasks,
})

const mapDispatchToProps = (dispatch) => {
    return {
        // this.props.fetchOverviewTasks();
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(OverviewPage));
