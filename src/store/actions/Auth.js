import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQpVSAXHNBTeGszlTM9AjPUfw1ujVJZcA'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQpVSAXHNBTeGszlTM9AjPUfw1ujVJZcA'
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data)
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(authTimeOut(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFailed(error.response.data.error))
            })
    }
}

export const authCheckState = () => {
    const token = localStorage.getItem('token')
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    const localId = localStorage.getItem('localId')
    return dispatch => {
        if(token === null) {
            dispatch(logout())
        }else {
            if (expirationDate <= new Date()) {
                dispatch(logout())
            }else {
                dispatch(authSuccess(token, localId))
                dispatch(authTimeOut((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}