import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutsummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h3 style={{color:'white'}}>We Hope it taste good..</h3>
            <div style={{width:'100%',margin:'auto'}}> 
                <Burger Allingredients={props.ingredients} />
            </div>
            <Button btntype='Danger' clicked={props.checkoutcancelled}>Cancel</Button>
            <Button btntype='Success' clicked={props.checkoutcontinued} style={{backgroundColor:'white'}}>Continue</Button>
        </div>
    )
}

export default checkoutsummary