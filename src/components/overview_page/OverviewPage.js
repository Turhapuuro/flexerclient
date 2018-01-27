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

        this.state = {
            selectedDate: moment(),
        };

        this.getMonthTaskData = this.getMonthTaskData.bind(this);
    }

    getProjectTableData(data) {
        const projectTableData = {};

        data.forEach(task => {
            const foundProject = this.props.projects.find(({ id }) => (id === task.project_id));
            const dataKey = foundProject ? foundProject.name : 'unassinged';
            const projectTotal = (projectTableData[dataKey] || 0) + timeToDecimal(task.total_hours);
            projectTableData[dataKey] = projectTotal;
        });

        return projectTableData;
    }

    componentWillMount() {
        this.props.fetchProjects();
    }

    getMonthTaskData(selectedDate) {
        const lastDay = selectedDate.daysInMonth();

        this.props.fetchTaskOverviewByMonth({
            first_day: selectedDate.date(1).format('YYYY-MM-DD'),
            last_day: selectedDate.date(lastDay).format('YYYY-MM-DD'),
        });

        this.setState({ selectedDate });
    }

    render() {
        const { tasks, projects } = this.props;
        const { selectedDate } = this.state;

        return (
            <PageContainer>
                <MonthSelector requestMonthData={this.getMonthTaskData} />
                <TaskBarChart
                    data={tasks}
                    projects={projects}
                    plotDayCount={selectedDate.daysInMonth()}
                />
                <ProjectTable projectData={this.getProjectTableData(tasks)} />
            </PageContainer>
        )
    }
}

OverviewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tasks: state.taskStore.overviewTasks,
    projects: state.projectStore.projects
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTaskOverviewByMonth: (data) => dispatch(fetchTaskOverviewByMonth(data)),
        fetchProjects: () => dispatch(fetchProjects()),
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(OverviewPage));
