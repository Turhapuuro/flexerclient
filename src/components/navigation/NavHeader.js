import React from 'react';
import { withStyles } from 'material-ui/styles';


const styles = (theme) => ({
    navHeader: {
        fontSize: 24,
        padding: 16,
        cursor: 'default',
        color: '#885200',
    },
});

const NavHeader = (props) => {
    const { classes } = props;

    return (
        <div className={classes.navHeader}>
            FLEXER
        </div>
    );
};

export default withStyles(styles, { withThem: true })(NavHeader);
