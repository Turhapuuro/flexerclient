import React from 'react';
import { withStyles } from 'material-ui/styles';

import { navWidth } from '../navigation/Navigation';


const styles = (theme) => ({
    pageContainer: {
        width: `calc(100% - ${navWidth}px)`,
        float: 'right',
        height: '100vh',
        backgroundImage: `linear-gradient(to bottom, white 0%, #f1f1f1 100%)`,
        overflow: 'auto',
    },
});

const PageContainer = (props) => {
    const { classes, children } = props;
    return (
        <div className={classes.pageContainer}>
            {children}
        </div>
    );
};

export default withStyles(styles, { withThem: true })(PageContainer);
