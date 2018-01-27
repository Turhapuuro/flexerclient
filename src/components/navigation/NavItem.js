import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { history } from '../../index';


const navItemHoverStyle = {
    '&:hover': {
        backgroundColor: '#c17400',
    },
};

const styles = (theme) => ({
    navItem: {
        ...navItemHoverStyle,
    },
    navItemActive: {
        ...navItemHoverStyle,
        backgroundColor: '#DA8300',
    },
});

const NavItem = (props) => {
    const { classes, link, text } = props;
    const isActive = link === history.location.pathname;
    const { navItem, navItemActive } = classes;

    return (
        <ListItem
            button
            classes={{ root: isActive ? navItemActive : navItem }}
            component={Link}
            to={link}
        >
            <ListItemText primary={text}/>
        </ListItem>
    );
};

export default withStyles(styles, { withThem: true })(NavItem);
