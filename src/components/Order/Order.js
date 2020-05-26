import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
    let Ingredients = []
    for( let ing in props.inggg){
        Ingredients.push({
            name: ing,
            amount: props.inggg[ing]
        })
    }
    const opingredients = Ingredients.map(ig => {
        return <span key={ig.name}  style={{
            textDecoration:'capitalize',
            display:'inline-block',
            backgroundColor:'white',
            color:'black',
            margin:'0 8px',
            padding:'5px',
            border:'1px solid #ccc'
        }}>{ig.name}: {ig.amount}</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {opingredients}</p>
            <p>Price: <strong style={{
                textDecoration:'capitalize',
                backgroundColor:'white',
                color:'black',
                margin:'0 8px',
                padding:'5px',
                border:'1px solid #ccc'
            }}>{props.price} Rupees</strong></p>
        </div>
    )
}

export default order