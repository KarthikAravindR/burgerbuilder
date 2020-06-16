import React, { Component } from 'react';

import axios from '../../axios-order'
import Auxillary from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import Buildcontrols from '../../components/Burger/Buildcontrols/Bulidcontrols'
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/Burger/Ordersummary/Ordersummary'
import Spinners from '../../components/UI/Spinners/Spinners'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'


import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 50,
    bacon: 60,
    meat: 130,
    cheese: 40
}

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.initIngredients()
    }

    updatePurchasingHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({ purchasing: true })
        } else {
            this.props.history.push('/auth')
        }
    }
    modalclosehandler = () => {
        this.setState({ purchasing: false })
    }
    purshasecontinueHandler = () => { 
        this.props.onInitPurchase()  
        this.props.history.push({
            pathname:'checkout',
        })
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredient[type] = updatedCount;

    //     const oldPrice = this.state.totalprice;
    //     const updatedPrice = oldPrice + INGREDIENT_PRICES[type];

    //     this.setState({
    //         totalprice: updatedPrice,
    //         ingredients: updatedIngredient
    //     })
    //     this.updatePurchaseHandler(updatedIngredient);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredient[type] = updatedCount;

    //     const oldPrice = this.state.totalprice;
    //     const updatedPrice = oldPrice - INGREDIENT_PRICES[type];

    //     this.setState({
    //         totalprice: updatedPrice,
    //         ingredients: updatedIngredient
    //     });
    //     this.updatePurchaseHandler(updatedIngredient);
    // }

    render() {
        const disabledinfo = { ...this.props.ing }
        for (let key in disabledinfo) {
            disabledinfo[key] = disabledinfo[key] <= 0;
        }
        console.log(disabledinfo);
        
        let burger = this.props.error?<p>Ingredients can't be loaded</p>: <Spinners />
        let modalshow = null;

        if (this.props.ing) {
            burger = 
            <Auxillary>
                <Burger Allingredients={this.props.ing} />
                <Buildcontrols
                    ingredientadded={this.props.addIngredient}
                    ingredientremoved={this.props.removeIngredient}
                    disabled={disabledinfo}
                    price={this.props.prc}
                    purchase={this.props.purschas}
                    isAuthenticated={this.props.isAuthenticated}
                    ordered={this.updatePurchasingHandler} />
            </Auxillary>
            modalshow = <Ordersummary
            ingredients={this.props.ing}
            price={this.props.prc}
            purchasecancelled={this.modalclosehandler}
            purchasecontinued={this.purshasecontinueHandler} />
        }

        return (
            <Auxillary>
                <Modal show={this.state.purchasing} modalclosed={this.modalclosehandler}>
                    {modalshow}
                </Modal>
                {burger}
            </Auxillary>
        );
    }
}

const mapStateToProps = state => {
    return({
        ing: state.burgerbuilder.ingredients,
        prc: state.burgerbuilder.totalprice,
        purschas: state.burgerbuilder.purchasable,
        error: state.burgerbuilder.error,
        isAuthenticated: state.auth.token !== null
    })
}
const mapDispatchToProps = dispatch => {
    return({
        addIngredient: (types) => {dispatch(actions.addIngredient(INGREDIENT_PRICES, types))},
        removeIngredient: (types) => {dispatch(actions.removeIngredient(INGREDIENT_PRICES, types))},
        initIngredients: () => {dispatch(actions.initIngredients())},
        onInitPurchase: () => {dispatch(actions.purchaseInit())}
    })
}
export default withErrorHandler(connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder), axios)