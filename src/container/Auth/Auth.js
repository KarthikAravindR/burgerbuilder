import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import { connect } from 'react-redux'
import * as actions from  '../../store/actions/index'
import Spinner from '../../components/UI/Spinners/Spinners'
import { Redirect } from 'react-router-dom'

class Auth extends Component {

    state = {
        controls: {
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
            password: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'Password',
                    type: 'password'
                },
                value: '',
                validation: {
                    isrequired: true,
                    minLength: 7
                },
                valid: true
            },
        },
        isSignup: true
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

    inputchangeHandler = (event, controlname) => {
        const updatedControls = {
            ...this.state.controls,
            [controlname]: {
                ...this.state.controls[controlname],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlname].validation)
        }
    }
    this.setState({controls: updatedControls})
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            isSignup: !prevState.isSignup
        }));
    }

    authenticationHandler = (event) => {
        event.preventDefault()
        this.props.onAuthHandler(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    render() {
        let formelementarray = [];
        for (let key in this.state.controls) {
            formelementarray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form =
            <form>
                {formelementarray.map(formelement => (
                    <Input key={formelement.id}
                        shouldvalidate={formelement.config.validation}
                        validity={formelement.config.valid}
                        changd={(event) => this.inputchangeHandler(event, formelement.id)}
                        label={formelement.id}
                        elementtype={formelement.config.elementtype}
                        elementconfig={formelement.config.elementconfig}
                        value={formelement.config.value} />
                ))}
            </form>
        if (this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null
        if (this.props.error) {
        errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            if(this.props.totalprice > 100) {
                authRedirect = <Redirect to="/checkout" />
            }else {
                authRedirect = <Redirect to="/" />
            }
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button btntype='Success' clicked={this.authenticationHandler}>Submit</Button>
                <Button btntype='Danger' clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? 'SIGN-IN' : 'SIGN-UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        totalprice: state.burgerbuilder.totalprice
    }
}

const mapDispatchToState = dispatch => {
    return{
        onAuthHandler: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Auth)