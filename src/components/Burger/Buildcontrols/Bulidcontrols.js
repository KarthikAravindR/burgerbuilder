import React from 'react';
import classes from './Buildcontrols.module.css';

import Buildcontrol from './Buildcontrol/Buildcontrol'

const buildcontrols = ( props ) => {
    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat', type: 'meat'}
    ];
    return (    
        <div className={classes.Buildcontrols}>
            <p>TOTAL PRICE: <strong>{props.price}</strong> Rupees</p>
            {controls.map(ctrl => (
                <Buildcontrol 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={() => props.ingredientadded(ctrl.type)} 
                    removed={() => props.ingredientremoved(ctrl.type)}
                    disable={props.disabled[ctrl.type]}/>
            ))}
            <button className={classes.OrderButton} disabled={!props.purchase} onClick={props.ordered}>{props.isAuthenticated?'Order Now':'Sign Up To Checkout'}</button>
        </div>
    );
}

export default buildcontrols