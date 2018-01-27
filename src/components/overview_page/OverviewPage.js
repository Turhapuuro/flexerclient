import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTaskOverviewByMonth } from '../../actions/tasks';
import { withStyles } from 'material-ui/styles';

import PageContainer from '../common/PageContainer';
import MonthSelector from './MonthSelector';
import TaskBarChart from './TaskBarChart';
import ProjectTable from './ProjectTable';

//import { getRandomizedMonthlyProjectData } from './mock_task_data';


const styles = theme => ({
    // Add component styles here.
});

class OverviewPage extends Component {
    constructor() {
        super();

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

        // Change tasks to this.props.data when backend serves API data via redux.
        const lastDay = date.daysInMonth();
        // const tasks = getRandomizedMonthlyProjectData(dayCount);
        //this.setState({ tasks });
        this.props.fetchTaskOverviewByMonth({
            first_day: date.date(1).format('YYYY-MM-DD'),
            last_day: date.date(lastDay).format('YYYY-MM-DD'),
        });
    }

    render() {
        const { tasks } = this.props;
        console.log(tasks);

        return (
            <PageContainer>
                <MonthSelector requestMonthData={this.getMonthTaskData} />
                {/*<TaskBarChart data={tasks} />*/}
                <ProjectTable projectData={this.getProjectTableData(tasks)} />
            </PageContainer>
        )
    }
}

OverviewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    // tasks: state.taskStore.tasks,
    tasks: state.taskStore.overviewTasks,
})

const mapDispatchToProps = (dispatch) => {
    return {
        // this.props.fetchOverviewTasks();
        fetchTaskOverviewByMonth: (data) => dispatch(fetchTaskOverviewByMonth(data))
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(OverviewPage));
