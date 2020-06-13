import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const addIngredient = (INGREDIENT_PRICES, types) => {
    return{
        type: actionTypes.ADDINGREDINT,
        ingredienttypes: types,
        INGREDIENT_PRICES:INGREDIENT_PRICES
    }
}
export const removeIngredient = (INGREDIENT_PRICES, types) => {
    return{
        type: actionTypes.REMOVEINGREDINT,
        ingredienttypes: types,
        INGREDIENT_PRICES:INGREDIENT_PRICES
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIbgredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-karthik.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIbgredientsFailed())
            })
    }
}