import React, { Component } from 'react'
import Order from '../../../components/Order/Order'
import axios from '../../../axios-order'
// import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        loading: true,
        orders: []
    }

    componentDidMount () {
        axios.get('/order.json')
            .then(response => {
                const fetcheddata = []
                for(let key in response.data) {
                    fetcheddata.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log('fetcheddata: ',fetcheddata)    
                this.setState({loading: false,orders: fetcheddata})
            })
            .catch(err => {
                this.setState({loading: false})
            });
    }

    render () {
        console.log(this.state.orders)
        return (
            
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id} inggg={order.ingredients} price={order.price}/>
                ))}
            </div>
        )
    }
}

export default Orders
// export default withErrorHandler(Orders)