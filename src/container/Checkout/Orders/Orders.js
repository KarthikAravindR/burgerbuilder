import React, { Component } from 'react'
import Order from '../../../components/Order/Order'
import axios from '../../../axios-order'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import Spinners from '../../../components/UI/Spinners/Spinners'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
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
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userid
    }
}
const mapStateToDispatch = dispatch => {
    return {
        onFetchOrders: (token, userId) => { dispatch(actions.fetchOrders(token, userId)) }
    }
}

export default withErrorHandler(connect(mapStateToProps, mapStateToDispatch)(Orders), axios)
// export default withErrorHandler(Orders)