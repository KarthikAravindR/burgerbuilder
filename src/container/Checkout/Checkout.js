import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Contactdata from './Contactdata/Contactdata'
// import { withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from "react-redux";

class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     price: 0
    //     }
    
    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search)
    //     let ingredient = {}
    //     let prices

    //     for (let params of query.entries()) {
    //         if (params[0] === 'price') {
    //             prices = params[1]
    //         } else {
    //             ingredient[params[0]] = +params[1]
    //         }
    //     }

    //     this.setState({
    //         ingredients: ingredient,
    //         price: prices
    //     })
    //     console.log('ingredients = ',this.state.ingredients)
    //     console.log('pricee = ',this.state.price)
    // }
    // componentDidMount () {
    //     console.log('ingredients = ',this.state.ingredients)
    //     console.log('pricee = ',this.state.price)
    // }

    checkoutcontinuedHandler = () => {
        this.props.history.replace('/checkout/contactdata')
    }

    checkoutcancelledHandler = () => {
        this.props.history.goBack()
    }

    render () {
        return (
            <div>
                <CheckoutSummary ingredients = {this.props.ingredients} checkoutcontinued={this.checkoutcontinuedHandler} checkoutcancelled={this.checkoutcancelledHandler}/>
                <Route path={this.props.match.path + '/contactdata'} component={Contactdata} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return({
        ingredients: state.ingredients,
        price: state.totalprice
    })
}

export default connect(mapStateToProps)(Checkout)