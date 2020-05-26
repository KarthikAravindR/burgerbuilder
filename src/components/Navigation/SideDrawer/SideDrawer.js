import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxillary from '../../../hoc/Auxillary'

const sideDrawer = (props) => {
    let additionalclasses= [classes.SideDrawer,classes.Close]
    if (props.closed) {
        additionalclasses = [classes.SideDrawer,classes.Open]
    }
    return (
        <Auxillary>
            <Backdrop show={props.closed} clicked={props.open}/> 
            <div className={additionalclasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <h4 className={classes.Title}>B & B</h4>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxillary>
    )
}

export default sideDrawer