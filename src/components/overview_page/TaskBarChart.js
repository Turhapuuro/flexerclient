import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

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

const CustomTooltip = (props) => {
    const { payload } = props;
    if (!props.active || !payload || !payload[0]) {
        return null;
    }

    const { classes, projectNames } = props;
    const tooltipData = payload[0].payload;

    return (
        <div className={classes.tooltip}>
            {projectNames.map((projectName) => {
                return (
                    tooltipData[projectName]
                    ? <div key={projectName}>{projectName}: {tooltipData[projectName]}h</div>
                    : null
                );
            })}
        </div>
    );
};

class TaskBarChart extends Component {
	render () {
        const { classes, plotData, taskProjects } = this.props;

        return (
            <div className={classes.barChartContainer}>
                <ResponsiveContainer>
                    <BarChart data={plotData}>
                        <XAxis dataKey="date" />
                        <YAxis>
                            <Label value='Hours' angle={-90} position='insideLeft' />
                        </YAxis>
                        <CartesianGrid strokeDasharray="2 2"/>
                        <Tooltip content={
                            <CustomTooltip
                                classes={classes}
                                projectNames={taskProjects.map(({ name }) => name)} />}
                            />
                        <Tooltip />
                        {taskProjects.map(({ name, color }, i) => (
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
    plotData: PropTypes.array,
    taskProjects: PropTypes.array,
};

export default withStyles(styles, { withThem: true })(TaskBarChart);
