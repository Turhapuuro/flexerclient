import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTaskOverviewByMonth } from '../../actions/tasks';
import { fetchProjects } from '../../actions/projects';
import { withStyles } from 'material-ui/styles';
import { times } from 'lodash';

import PageContainer from '../common/PageContainer';
import MonthSelector from './MonthSelector';
import TaskBarChart from './TaskBarChart';
import ProjectTable from './ProjectTable';

import { timeToDecimal } from '../../helper_functions/timeformatfunctions';
import { getRandomColor } from '../../helper_functions/colorfunctions';


const styles = theme => ({
    // Add component styles here.
});

const UNASSIGNED_PROJECT_NAME = 'unassigned';

class OverviewPage extends Component {
    constructor() {
        super();

        this.state = {
            selectedDate: moment(),
        };

        this.fetchMonthTaskData = this.fetchMonthTaskData.bind(this);
    }

    componentWillMount() {
        this.props.fetchProjects();
    }

    getProjectTableData(tasks, projects) {
        const projectTableData = {};

        tasks.forEach(({ project_id, total_hours }) => {
            const foundProject = this.findProjectById(projects, project_id);
            const projectName = foundProject ? foundProject.name : UNASSIGNED_PROJECT_NAME;
            const projectTotal = (projectTableData[projectName] || 0) + timeToDecimal(total_hours);
            projectTableData[projectName] = projectTotal;
        });

        return projectTableData;
    }

    findProjectById(projects, projectId) {
        return projects.find(({ id }) => (id === projectId));
    }

    getPlotData(tasks, projects) {
        const plotDayCount = this.state.selectedDate.daysInMonth();
        const plotData = times(plotDayCount, (i) => ({
            date: i + 1,
        }));

        tasks.forEach(({ total_hours, project_id, date }) => {
            const total = timeToDecimal(total_hours);
            const taskDay = moment(date).format('DD');
            const index = taskDay - 1;

            const dayTotal = (plotData[index].total || 0) + total;
            plotData[index].total = dayTotal;

            const project = this.findProjectById(projects, project_id);
            const projectName = project ? project.name : UNASSIGNED_PROJECT_NAME;
            const projectTotal = (plotData[index][projectName] || 0) + total;
            plotData[index][projectName] = projectTotal;
        });

        return plotData;
    }

    fetchMonthTaskData(selectedDate) {
        const lastDay = selectedDate.daysInMonth();

        this.props.fetchTaskOverviewByMonth({
            first_day: selectedDate.date(1).format('YYYY-MM-DD'),
            last_day: selectedDate.date(lastDay).format('YYYY-MM-DD'),
        });

        this.setState({ selectedDate, isFetching: true });
    }

    getTaskProjects(plotData, projects) {
        const taskProjects = [];
        plotData.forEach((dataObj) => {
            Object.keys(dataObj).forEach((projectName) => {
                const projectExists = taskProjects.find(({ name }) => (name === projectName));
                // Collect all project names found in the data and randomize a color for each.
                // Project color could be stored in db in the future.
                if (!projectExists && !['date', 'total'].includes(projectName)) {
                    taskProjects.push({
                        name: projectName,
                        color: getRandomColor(),
                    });
                }
            });
        });
        return taskProjects;
    }

    render() {
        const { tasks, projects } = this.props;
        const plotData = this.getPlotData(tasks, projects);

        return (
            <PageContainer>
                <MonthSelector requestMonthData={this.fetchMonthTaskData} />
                <TaskBarChart
                    plotData={plotData}
                    taskProjects={this.getTaskProjects(plotData, projects)}
                />
                <ProjectTable projectData={this.getProjectTableData(tasks, projects)} />
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
