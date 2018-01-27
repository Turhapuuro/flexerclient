import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTaskOverviewByMonth } from '../../actions/tasks';
import { fetchProjects } from '../../actions/projects';
import { withStyles } from 'material-ui/styles';

import PageContainer from '../common/PageContainer';
import MonthSelector from './MonthSelector';
import TaskBarChart from './TaskBarChart';
import ProjectTable from './ProjectTable';

//import { getRandomizedMonthlyProjectData } from './mock_task_data';

const styles = theme => ({
    // Add component styles here.
});

function timeToDecimal(time) {
    var [hours, minutes] = time.split(':');
    return parseFloat(parseInt(hours, 10) + '.' + parseInt((minutes / 6) * 10, 10));
}

class OverviewPage extends Component {
    constructor() {
        super();

        this.getMonthTaskData = this.getMonthTaskData.bind(this);
    }

    getProjectTableData(data) {
        const projectTableData = {
                unassinged: 0
            };
        data.forEach(task => {
            const foundProject = this.props.projects.find((project) => (
                project.id === task.project_id
            ));

            if (foundProject){
                if (projectTableData[foundProject.name]) {
                    projectTableData[foundProject.name] += timeToDecimal(task.total_hours);
                } else {
                    projectTableData[foundProject.name] = timeToDecimal(task.total_hours);
                }
            } else {
                projectTableData.unassinged += timeToDecimal(task.total_hours);
            }
        });

        return projectTableData;
    }

    componentWillMount() {
        this.props.fetchProjects();
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

        return (
            <PageContainer>
                <MonthSelector requestMonthData={this.getMonthTaskData} />
                <TaskBarChart data={tasks} />
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
    projects: state.projectStore.projects
})

const mapDispatchToProps = (dispatch) => {
    return {
        // this.props.fetchOverviewTasks();
        fetchTaskOverviewByMonth: (data) => dispatch(fetchTaskOverviewByMonth(data)),
        fetchProjects: () => dispatch(fetchProjects()),
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(OverviewPage));
