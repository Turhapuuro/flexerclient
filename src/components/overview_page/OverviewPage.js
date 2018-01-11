import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
// import { fetchTasks, addTask, editTask, deleteTask } from '../../actions/tasks';
import { withStyles } from 'material-ui/styles';

// import Grid from 'material-ui/Grid';

import PageContainer from '../common/PageContainer';
import MonthSelector from './MonthSelector';

// import { getDate } from '../../helper_functions/timeformatfunctions';
// import { blue, grey } from 'material-ui/colors';


const styles = theme => ({
    barChartContainer: {
        height: 400,
        border: '1px solid black',
        margin: '0 10px',
        padding: 10,
    },
});

class OverviewPage extends Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillMount() {
        // this.props.fetchOverviewTasks();
    }

    render() {
        const { classes } = this.props;
        return (
            <PageContainer>
                <MonthSelector />
                <div className={classes.barChartContainer}>
                    render bar chart here
                </div>
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
