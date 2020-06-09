import React, { Component } from 'react';

import axios from '../../axios-order'
import Auxillary from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import Buildcontrols from '../../components/Burger/Buildcontrols/Bulidcontrols'
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/Burger/Ordersummary/Ordersummary'
import Spinners from '../../components/UI/Spinners/Spinners'
import { connect } from 'react-redux'


import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 50,
    bacon: 60,
    meat: 130,
    cheese: 40
}

class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalprice: 100,
        // purchasable: false,
        purchasing: false,
        loading: false
    }

    // componentDidMount() {
    //     axios.get('https://react-my-burger-karthik.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ ingredients: response.data })
    //         })
    // }

    // updatePurchaseHandler = (ingredient) => {
    //     const sum = Object.values(ingredient).reduce((sum, el) => sum + el);
    //     this.setState({ purchasable: sum > 0 })
    // }

    updatePurchasingHandler = () => {
        this.setState({ purchasing: true })
    }
    modalclosehandler = () => {
        this.setState({ purchasing: false })
    }
    purshasecontinueHandler = () => {   
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
        
        let burger = <Spinners />
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
                    ordered={this.updatePurchasingHandler} />
            </Auxillary>
            modalshow = <Ordersummary
            ingredients={this.props.ing}
            price={this.props.prc}
            purchasecancelled={this.modalclosehandler}
            purchasecontinued={this.purshasecontinueHandler} />
        }
        

        if (this.state.loading) {
            modalshow = <Spinners />
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
        ing: state.ingredients,
        prc: state.totalprice,
        purschas: state.purchasable
    })
}
const mapDispatchToProps = dispatch => {
    return({
        addIngredient: (types) => {dispatch({type:"ADD_INGREDINT",INGREDIENT_PRICES:INGREDIENT_PRICES,ingredienttypes:types})},
        removeIngredient: (types) => {dispatch({type:"REMOVE_INGREDINT",INGREDIENT_PRICES:INGREDIENT_PRICES,ingredienttypes:types})}
    })
}
export default withErrorHandler(connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder), axios)