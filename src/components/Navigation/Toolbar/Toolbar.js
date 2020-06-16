import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
// import Button from '../../UI/Button/Button'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            {/* <Button clicked={props.sideshow}>MENU</Button> */}
            <DrawerToggle clicked={props.sideshow}/>
            <div className={classes.Logo}>
                <Logo />
                
            </div>
            <h1>Burger and Beyond</h1>
            <nav className={classes.Desktoponly}>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
        </header>
    )
}

export default toolbar