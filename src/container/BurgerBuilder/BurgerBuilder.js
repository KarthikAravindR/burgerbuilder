import React, { Component } from 'react';

import axios from '../../axios-order'
import Auxillary from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import Buildcontrols from '../../components/Burger/Buildcontrols/Bulidcontrols'
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/Burger/Ordersummary/Ordersummary'
import Spinners from '../../components/UI/Spinners/Spinners'


import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 50,
    bacon: 60,
    meat: 130,
    cheese: 40
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalprice: 100,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-karthik.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
    }

    updatePurchaseHandler = (ingredient) => {
        const sum = Object.values(ingredient).reduce((sum, el) => sum + el);
        this.setState({ purchasable: sum > 0 })
    }

    updatePurchasingHandler = () => {
        this.setState({ purchasing: true })
    }
    modalclosehandler = () => {
        this.setState({ purchasing: false })
    }
    purshasecontinueHandler = () => {
        
        const queryparams = []
        for (let i in this.state.ingredients) {
            queryparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) )
        }
        queryparams.push('price='+ this.state.totalprice)
        const querystring = queryparams.join('&')
        this.props.history.push({
            pathname:'checkout',
            search: '?' + querystring
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;

        const oldPrice = this.state.totalprice;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];

        this.setState({
            totalprice: updatedPrice,
            ingredients: updatedIngredient
        })
        this.updatePurchaseHandler(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;

        const oldPrice = this.state.totalprice;
        const updatedPrice = oldPrice - INGREDIENT_PRICES[type];

        this.setState({
            totalprice: updatedPrice,
            ingredients: updatedIngredient
        });
        this.updatePurchaseHandler(updatedIngredient);
    }

    render() {
        const disabledinfo = { ...this.state.ingredients }
        for (let key in disabledinfo) {
            disabledinfo[key] = disabledinfo[key] <= 0;
        }
        console.log(disabledinfo);
        
        let burger = <Spinners />
        let modalshow = null;

        if (this.state.ingredients) {
            burger = 
            <Auxillary>
                <Burger Allingredients={this.state.ingredients} />
                <Buildcontrols
                    ingredientadded={this.addIngredientHandler}
                    ingredientremoved={this.removeIngredientHandler}
                    disabled={disabledinfo}
                    price={this.state.totalprice}
                    purchase={this.state.purchasable}
                    ordered={this.updatePurchasingHandler} />
            </Auxillary>
            modalshow = <Ordersummary
            ingredients={this.state.ingredients}
            price={this.state.totalprice}
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

export default withErrorHandler(BurgerBuilder, axios)