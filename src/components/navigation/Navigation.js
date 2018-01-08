import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

import NavHeader from './NavHeader';
import NavItem from './NavItem';

import { orange } from 'material-ui/colors';


export const navWidth = 180;

const styles = (theme) => ({
    navWrapper: {
        backgroundColor: orange[400],
        width: navWidth,
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
                    <NavItem text='Tasks' link='/' />
                    <NavItem text='Overview' link='/overview' />
                    <Divider />
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles, { withThem: true })(Navigation);
