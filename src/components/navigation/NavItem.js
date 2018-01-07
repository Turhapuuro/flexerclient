import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';


const styles = (theme) => ({
    navItem: {
    },
});

const NavItem = (props) => {
    const { classes, text } = props;

    return (
        <ListItem button className={classes.navItemText}>
            <ListItemText primary={text} />
        </ListItem>
    );
};

export default withStyles(styles, { withThem: true })(NavItem);
