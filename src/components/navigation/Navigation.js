import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import { brown } from 'material-ui/colors';


export const drawerWidth = 180;

const styles = (theme) => ({
    drawerPaper: {
        backgroundColor: brown[300],
        width: drawerWidth,
    },
    drawerHeader: {
        fontSize: 24,
        padding: 16,
    },
});

class Navigation extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                type='permanent'
                classes={{ paper: classes.drawerPaper, }}
                anchor='left'
            >
                <div className={classes.drawerHeader}>
                    FLEXER
                </div>
                <Divider />
                <List>
                    <ListItem>Tasks</ListItem>
                    <ListItem>Overview</ListItem>
                </List>
                <Divider />
            </Drawer>
        );
    }
}

export default withStyles(styles, { withThem: true })(Navigation);
