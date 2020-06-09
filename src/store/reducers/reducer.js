const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    totalprice: 100,
    purchasable: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDINT':
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

        case 'REMOVE_INGREDINT':
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

        default:
            return state
    }
}

export default reducer