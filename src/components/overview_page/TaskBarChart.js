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
    if (!props.active) {
        return null;
    }

    const { classes, payload, projectNames } = props;
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
    getBarFillColor(projectName) {
        switch (projectName) {
            case 'p1':
                return 'orange';
            case 'p2':
                return 'green';
            default:
                return 'purple';
        }
    }

	render () {
        const { classes, data } = this.props;

        // Example expected data object in data array:
        // { date: d, p1: H, p2: H, p3: H }
        // { date: 1, p1: 3, p2: 3, p3: 1 }
        const projectNames = [];
        data.forEach((dataObj) => {
            Object.keys(dataObj).forEach((projectName) => {
                // Collect all project names found in the data.
                if (!projectNames.includes(projectName) && !['date', 'total'].includes(projectName)) {
                    projectNames.push(projectName);
                }
            });
        });

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
                            <CustomTooltip classes={classes} projectNames={projectNames} />}/>
                        <Tooltip />
                        {projectNames.map((projectName, i) => (
                            <Bar key={i} dataKey={projectName} stackId='a' fill={this.getBarFillColor(projectName)}>
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
