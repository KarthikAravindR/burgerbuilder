import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/order.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            })
    }
}
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrdersSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: data
    }
}
export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryparams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/order.json' + queryparams)
            .then(response => {
                const fetcheddata = []
                for (let key in response.data) {
                    fetcheddata.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log('fetcheddata: ', fetcheddata)
                dispatch(fetchOrdersSuccess(fetcheddata))
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            });
    }
}
                                        // export const purchaseInit = () => {
                                        //     return{
                                        //         type: actionTypes.PURCHASE_INIT
                                        //     }
                                        // }