import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';

import { Link } from 'react-router-dom';

const styles = (theme) => ({
    navItem: {
    },
});

const NavItem = (props) => {
    const { classes, link, text } = props;

    return (
        <Link to={link}>
            <ListItem button className={classes.navItemText}>
                <ListItemText primary={text} />
            </ListItem>
        </Link>
    );
};

export default withStyles(styles, { withThem: true })(NavItem);
