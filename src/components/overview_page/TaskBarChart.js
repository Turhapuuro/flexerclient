import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import moment from 'moment';

import { times } from 'lodash';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Label } from 'recharts';


const styles = (theme) => ({
    barChartContainer: {
        height: 400,
        padding: '8px 36px 20px',
    },
    xAxisLabel: {
        textAlign: 'center',
        cursor: 'default',
    },
    tooltip: {
        boxShadow: '#737373 1px 1px 2px',
        backgroundColor: 'white',
        padding: 10,
    },
});

function timeToDecimal(time) {
    const [hours, minutes] = time.split(':');
    return parseFloat(parseInt(hours, 10) + '.' + parseInt((minutes/6)*10, 10));
}

function getRandColor(brightness = 3){
    // Six levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness * 51, brightness * 51, brightness * 51]; // 51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map((x) => (Math.round(x / 2.0)));
    return "rgb(" + mixedrgb.join(",") + ")";
}

const CustomTooltip = (props) => {
    const { payload } = props;
    if (!props.active || !payload || !payload[0]) {
        return null;
    }

    const { classes, projectNames } = props;
    const tooltipData = payload[0].payload;
    const total = tooltipData.total;

    return (
        <div className={classes.tooltip}>
            <div>Total: {total}h</div>
            {projectNames.map((projectName) => {
                if (tooltipData[projectName]) {
                    return (
                        <div key={`${projectName}-tooltip`}>
                            {projectName}: {tooltipData[projectName]}h
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

class TaskBarChart extends Component {
    parseTaskPlottingData() {
        const activeDate = moment(); // Use this.props.activeDate here
        const dayCount = activeDate.daysInMonth();
        const { data } = this.props;
        console.log(data);

        const plotData = times(dayCount, (i) => ({
            date: i + 1,
        }));

        data.forEach((task) => {
            const { total_hours, project_id } = task;

            const total = timeToDecimal(total_hours);
            const taskDay = moment(task.date).format('DD');
            const index = taskDay - 1;

            const dayTotal = (plotData[index].total || 0) + total;
            plotData[index].total = dayTotal;

            const dataKey = project_id || 'unknown';
            const projectTotal = (plotData[index][dataKey] || 0) + total;
            plotData[index][dataKey] = projectTotal;
        });

        return plotData;
    }

    getProjects(data) {
        const projects = [];
        data.forEach((dataObj) => {
            Object.keys(dataObj).forEach((projectName) => {
                const projectExists = projects.find(({ name }) => (name === projectName));
                // Collect all project names found in the data.
                if (!projectExists && !['date', 'total'].includes(projectName)) {
                    projects.push({
                        name: projectName,
                        color: getRandColor(),
                     });
                }
            });
        });
        return projects;
    }

	render () {
        const { classes } = this.props;
        const data = this.parseTaskPlottingData();

        // Example expected data object in data array:
        // { date: d, p1: H, p2: H, p3: H }
        // { date: 1, p1: 3, p2: 3, p3: 1 }
        const projects = this.getProjects(data);

        return (
            <div className={classes.barChartContainer}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="date" />
                        <YAxis>
                            <Label value='Hours' angle={-90} position='insideLeft' />
                        </YAxis>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip content={
                            <CustomTooltip
                                classes={classes}
                                projectNames={projects.map(({ name }) => name)} />}
                            />
                        <Tooltip />
                        {projects.map(({ name, color }, i) => (
                            <Bar key={i} dataKey={name} stackId='a' fill={color}>
                                <LabelList dataKey='total' position='top' />
                            </Bar>
                        ))}
                    </BarChart>
                </ResponsiveContainer>
                <div className={classes.xAxisLabel}>
                    Day
                </div>
            </div>
        );
    }
}

TaskBarChart.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};

export default withStyles(styles, { withThem: true })(TaskBarChart);
