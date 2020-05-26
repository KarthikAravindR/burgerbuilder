import React, { Component } from 'react'
import classes from './Contactdata.module.css'
import axios from '../../../axios-order'
import Input from '../../../components/UI/Input/Input'

class Contactdata extends Component {
    state = {
        orders: {
            name: {
                elementtype:'input',
                elementconfig:{
                    placeholder:'Your Name',
                    type:'input'
                },
                value:'',
                validation: {
                    isrequired: true,
                },
                valid:true
            },
            street: {
                elementtype:'input',
                elementconfig:{
                    placeholder:'street',
                    type:'input'
                },
                value:'',
                validation: {
                    isrequired: true,
                },
                valid:true
            },
            zipcode: {
                elementtype:'input',
                elementconfig:{
                    placeholder:'ZIP Code',
                    type:'input'
                },
                value:'',
                validation: {
                    isrequired: true,
                    minlength: 5,
                    maxLength: 5
                },
                valid:true
            },
            email: {
                elementtype:'input',
                elementconfig:{
                    placeholder:'Your Mail',
                    type:'input'
                },
                value:'',
                validation: {
                    isrequired: true,
                },
                valid:true
            },
            deliverymethod: {
                elementtype:'select',
                elementconfig:{
                    options: [{value:'fastest',displayvalue:'fastest'},{value:'slowest',displayvalue:'slowest'}]
                },
                value:'fastest',
                validation:{},
                valid:true
            },
        },
        loading: false,
        forminvalid: false
    }

    orderplacedHandler = () => {
        console.log('ordr placd')
        this.setState({ loading: true })
        const formdata = {}
        for(let formdataidentifier in this.state.orders){
            formdata[formdataidentifier] = this.state.orders[formdataidentifier].value
        }
        const order = {
            ingredients: this.props.allingredients,
            price: this.props.price,
            userdata: formdata

        }
        axios.post('/order.json', order)
            .then(response => { this.setState({ loading: false }); console.log(response) })
            .catch(error => { this.setState({ loading: false }) })
        console.log("RWQ PROPS", this.props)
    }

    checkvalidity = (value, rules) => {
        let isValid = true
        console.log('value :',value)
        console.log('rules :',rules)
        if(rules.isrequired) {
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minlength) {
            isValid = value.length >= 5 && isValid
        }
        if(rules.maxlength) {
            isValid = value.length <= 5 && isValid
        }
        console.log('isValid :',isValid)
        return isValid
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
        updatedformelements.valid = this.checkvalidity(updatedformelements.value,updatedformelements.validation)
        console.log('updatedformelements.valid :',updatedformelements.valid)
        updatedformorders[inputidentifier] = updatedformelements
        let formvalidation = true
        for (let inputidentifier in updatedformorders){
            formvalidation = updatedformorders[inputidentifier].valid && formvalidation
        }
        this.setState({orders:updatedformorders,forminvalid:formvalidation})
    }

    render() {
        let formelementarray = [];
        for (let key in this.state.orders){
            formelementarray.push({
                id:key,
                config: this.state.orders[key]
            })
        }
        return (
            <div className={classes.Contactdata}>
                <h3>Enter your contact details here</h3>
                <form>
                {formelementarray.map(formelement => (
                    <Input key={formelement.id} shouldvalidate={formelement.config.validation   } validity={formelement.config.valid} changd={(event) => this.inputchangeHandler(event,formelement.id)} label={formelement.id} elementtype={formelement.config.elementtype} elementconfig={formelement.config.elementconfig} value={formelement.config.value}/>
                ))}
                    
                </form>
                <button className={classes.Button} disabled={!this.state.forminvalid} onClick={this.orderplacedHandler}>Order</button>
            </div>
        )
    }
}


export default Contactdata