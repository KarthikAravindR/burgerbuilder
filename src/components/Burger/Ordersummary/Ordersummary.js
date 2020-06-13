import React, { Component } from 'react'
import Auxillary from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button'
import { NavLink } from 'react-router-dom'

class Ordersummary extends Component{
    componentDidUpdate () {
        console.log('order summary rendered')
    }

    render () {
        let ingredientsummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{this.props.ingredients[igKey]}</li>
        })

        return (
            <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientsummary}
            </ul>
            <p>TOTAL PRICE: <strong>{this.props.price}</strong> Rupees</p>
            <p>Do you want to checkout?</p>
            <Button btntype="Danger" clicked={this.props.purchasecancelled}>CANCEL</Button>
            <Button btntype="Success" clicked={this.props.purchasecontinued}><NavLink to='/checkout'>CONTINUE</NavLink></Button>
        </Auxillary>
        )
    }
}

export default Ordersummary