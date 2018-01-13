import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { mockData } from './mock_task_data';


const styles = (theme) => ({
    barChartContainer: {
    },
});

// const data = [
//       { date: '1/01', uv: 4000, pv: 2400, amt: 2400 },
//       { date: '2/01', uv: 3000, pv: 1398, amt: 2210 },
//       { date: '3/01', uv: 2000, pv: 9800, amt: 2290 },
//       { date: '4/01', uv: 2780, pv: 3908, amt: 2000 },
//       { date: '5/01', uv: 1890, pv: 4800, amt: 2181 },
//       { date: '6/01', uv: 2390, pv: 3800, amt: 2500 },
//       { date: '7/01', uv: 3490, pv: 4300, amt: 2100 },
// ];

class TaskBarChart extends Component {
    getBarFillColor(key) {
        switch (key) {
            case 'p1':
                return 'orange';
            case 'p2':
                return 'green';
            default:
                return 'purple';
        }
    }

	render () {
        const { classes } = this.props;

        const barDataKeys = [];
        mockData.forEach((dataObj) => {
            const keys = Object.keys(dataObj);
            keys.forEach((key) => {
                if (!barDataKeys.includes(key) && key !== 'date') {
                    barDataKeys.push(key);
                }
            });
        });

        return (
            <ResponsiveContainer
                minHeight={250}
                height='100%'
                width='100%'
                className={classes.barChartContainer}
            >
            <BarChart data={mockData}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                {barDataKeys.map((barDataKey, i) => (
                    <Bar key={i} dataKey={barDataKey} stackId="a" fill={this.getBarFillColor(barDataKey)} />
                ))}
            </BarChart>
            </ResponsiveContainer>
        );
    }
}

TaskBarChart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withThem: true })(TaskBarChart);
