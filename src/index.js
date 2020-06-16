import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore,applyMiddleware,compose,combineReducers } from "redux";
import { Provider } from "react-redux";
import BurgerBuilderreducer from './store/reducers/BurgerBuilder'
import orderreducer from './store/reducers/Order'
import authreducer from './store/reducers/Auth'
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => {
  return next => {
    return action => {
      console.log('Middleware dispatching',action)
      const result = next(action)
      console.log('Next function',store.getState())
      return result
    }
  }
}
const rootReducer = combineReducers({
  burgerbuilder: BurgerBuilderreducer,
  order: orderreducer,
  auth: authreducer
})
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger, thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
