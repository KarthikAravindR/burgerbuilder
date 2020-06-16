import React, { Component } from 'react'
import Spinner from '../../../components/UI/Spinners/Spinners'
import classes from './Contactdata.module.css'
import axios from '../../../axios-order'
import Input from '../../../components/UI/Input/Input'
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class Contactdata extends Component {
    state = {
        orders: {
            name: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'Your Name',
                    type: 'input'
                },
                value: '',
                validation: {
                    isrequired: true,
                },
                valid: true
            },
            street: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'street',
                    type: 'input'
                },
                value: '',
                validation: {
                    isrequired: true,
                },
                valid: true
            },
            zipcode: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'ZIP Code',
                    type: 'input'
                },
                value: '',
                validation: {
                    isrequired: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: true
            },
            country: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    isrequired: true
                },
                valid: true,
            },
            email: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'Your Mail',
                    type: 'input'
                },
                value: '',
                validation: {
                    isrequired: true,
                    isEmail: true
                },
                valid: true
            },
            deliverymethod: {
                elementtype: 'select',
                elementconfig: {
                    options: [{ value: 'fastest', displayvalue: 'fastest' }, { value: 'slowest', displayvalue: 'slowest' }]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        forminvalid: false
    }

    orderplacedHandler = () => {
        console.log('ordr placd')
        // this.setState({  : true })
        const formdata = {}
        for (let formdataidentifier in this.state.orders) {
            formdata[formdataidentifier] = this.state.orders[formdataidentifier].value
        }
        console.log('formdata =>', formdata)
        const order = {
            ingredients: this.props.allingredients,
            price: this.props.price,
            userdata: formdata,
            userId: this.props.userId
        }
        this.props.onPurchaseStart(order, this.props.token)
        // this.props.history.push('/')
        // console.log("RWQ PROPS", this.props)
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.isrequired) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputchangeHandler = (event, inputidentifier) => {
        console.log(event.target.value)
        const updatedformorders = {
            ...this.state.orders
        }
        const updatedformelements = {
            ...updatedformorders[inputidentifier]
        }
        updatedformelements.value = event.target.value
        updatedformelements.valid = this.checkValidity(updatedformelements.value, updatedformelements.validation)
        console.log('updatedformelements.valid :', updatedformelements.valid)
        updatedformorders[inputidentifier] = updatedformelements
        let formvalidation = true
        for (let inputidentifier in updatedformorders) {
            formvalidation = updatedformorders[inputidentifier].valid && formvalidation
        }
        this.setState({ orders: updatedformorders, forminvalid: formvalidation })
    }

    render() {
        let formelementarray = [];
        for (let key in this.state.orders) {
            formelementarray.push({
                id: key,
                config: this.state.orders[key]
            })
        }
        let form = <div>
            <form>
                {formelementarray.map(formelement => (
                    <Input  key={formelement.id} 
                            shouldvalidate={formelement.config.validation} 
                            validity={formelement.config.valid} 
                            changd={(event) => this.inputchangeHandler(event, formelement.id)} 
                            label={formelement.id} 
                            elementtype={formelement.config.elementtype} 
                            elementconfig={formelement.config.elementconfig} 
                            value={formelement.config.value} />
                ))}
            </form>
            <button className={classes.Button} disabled={!this.state.forminvalid} onClick={this.orderplacedHandler}>Order</button>
        </div>
        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.Contactdata}>
                <h3>Enter your contact details here</h3>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return ({
        allingredients: state.burgerbuilder.ingredients,
        price: state.burgerbuilder.totalprice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userid
    })
}
const mapDispatchToProps = dispatch => {
    return ({
        onPurchaseStart: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Contactdata, axios))