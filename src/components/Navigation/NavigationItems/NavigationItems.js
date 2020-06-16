import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'


const navigationitems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        {props.isAuthenticated? <NavigationItem link='/orders'>Checkout</NavigationItem> : null }
        {!props.isAuthenticated 
            ? <NavigationItem link='/auth'>Authentication</NavigationItem> 
            : <NavigationItem link='/logout'>Logout</NavigationItem>}
    </ul>
);

export default navigationitems