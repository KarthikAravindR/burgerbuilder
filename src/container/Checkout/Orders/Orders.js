import React, { Component } from 'react'
import Order from '../../../components/Order/Order'
import axios from '../../../axios-order'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import Spinners from '../../../components/UI/Spinners/Spinners'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    componentDidMount() {
        axios.get('/order.json')
            .then(response => {
                const fetcheddata = []
                for (let key in response.data) {
                    fetcheddata.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log('fetcheddata: ', fetcheddata)
            })
        this.props.onFetchOrders()
    }

    render() {
        let orders = <Spinners />
        if (!this.props.loading) {
            orders = <div>
                {this.props.orders.map(order => (
                    <Order
                        key={order.id} inggg={order.ingredients} price={order.price} />
                ))}
            </div>
        }
        return orders
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapStateToDispatch = dispatch => {
    return {
        onFetchOrders: () => { dispatch(actions.fetchOrders()) }
    }
}

export default withErrorHandler(connect(mapStateToProps, mapStateToDispatch)(Orders), axios)
// export default withErrorHandler(Orders)