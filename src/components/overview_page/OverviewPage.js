import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
// import { fetchTasks, addTask, editTask, deleteTask } from '../../actions/tasks';
import { withStyles } from 'material-ui/styles';

// import Grid from 'material-ui/Grid';

import PageContainer from '../common/PageContainer';

// import { getDate } from '../../helper_functions/timeformatfunctions';
// import { blue, grey } from 'material-ui/colors';


const styles = theme => ({
    // Add component styles here.
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
        return (
            <PageContainer>
                Overview page renders here
            </PageContainer>
        )
    }
}

OverviewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tasks: state.tasksStore.tasks,
})

const mapDispatchToProps = (dispatch) => {
    return {
        // this.props.fetchOverviewTasks();
    }
}

export default withStyles(styles, { withThem: true })(connect(mapStateToProps, mapDispatchToProps)(OverviewPage));
