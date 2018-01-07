import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

import NavHeader from './NavHeader';
import NavItem from './NavItem';

import { grey } from 'material-ui/colors';


export const drawerWidth = 180;

const styles = (theme) => ({
    navWrapper: {
        backgroundColor: grey[200],
        width: drawerWidth,
    },
});

class Navigation extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                type='permanent'
                classes={{ paper: classes.navWrapper, }}
                anchor='left'
            >
                <NavHeader />
                <List>
                    <Divider />
                    <NavItem text='Tasks' />
                    <NavItem text='Overview' />
                    <Divider />
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles, { withThem: true })(Navigation);
