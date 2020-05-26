import React from 'react';
import classes from './Burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = ( props ) => {
    let transformedingredients = Object.keys(props.Allingredients).map(igKey => {
        return [...Array(props.Allingredients[igKey])].map((_, i) => {
            return (<BurgerIngredient key={igKey + i} type={igKey}/>)
        })
    }).flat()
    if(transformedingredients.length === 0) {
        transformedingredients= <p style={{color:'white'}}>Please add some ingredients.</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'} />
            {transformedingredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div>
    );
}

export default burger;