import * as actionTypes from '../actions/actionTypes'
const initialState = {
    ingredients: null,
    totalprice: 100,
    purchasable: false,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDINGREDINT:
            const oldCount = state.ingredients[action.ingredienttypes];
            const updatedCount = oldCount + 1;
            const updatedIngredient = {
                ...state.ingredients
            }
            updatedIngredient[action.ingredienttypes] = updatedCount;

            const oldPrice = state.totalprice;
            const updatedPrice = oldPrice + action.INGREDIENT_PRICES[action.ingredienttypes];
            const sum = Object.values(updatedIngredient).reduce((sum, el) => sum + el);

            return({
                totalprice: updatedPrice,
                ingredients: updatedIngredient,
                purchasable: sum > 0
            })

        case actionTypes.REMOVEINGREDINT:
            const oldCount1 = state.ingredients[action.ingredienttypes];
            const updatedCount1 = oldCount1 - 1;
            const updatedIngredient1 = {
                ...state.ingredients
            }
            updatedIngredient1[action.ingredienttypes] = updatedCount1;

            const oldPrice1 = state.totalprice;
            const updatedPrice1 = oldPrice1 - action.INGREDIENT_PRICES[action.ingredienttypes];
            const sum1 = Object.values(updatedIngredient1).reduce((sum, el) => sum + el);

            return({
                totalprice: updatedPrice1,
                ingredients: updatedIngredient1,
                purchasable: sum1 > 0
            })
            case actionTypes.SET_INGREDIENTS:
                return({
                    ...state,
                    totalprice: 100,
                    ingredients: action.ingredients
                })
            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return({
                    ...state,
                    error: true
                })

        default:
            return state
    }
}

export default reducer