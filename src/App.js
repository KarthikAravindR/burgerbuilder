import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Burgerbuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/container/Checkout/Checkout'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Orders from './container/Checkout/Orders/Orders'
import Auth from './container/Auth/Auth'
import Logout from './container/Auth/Logout/Logout'
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount = () => {
    this.props.onAutoSignUp()
  }
  render () {
    // let routes = (
    //   <Switch>
    //     <Route path="/auth" component={Auth} />
    //     <Route path="/" component={Burgerbuilder} />
    //     <Redirect to="/" />
    //   </Switch>
    // )
    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path="/checkout" component={Checkout} />
    //       <Route path="/orders" component={Orders} />
    //       <Route path="/logout" component={Logout} />
    //       <Route path="/" component={Burgerbuilder} />
    //       <Redirect to="/" />
    //     </Switch>
    //   )
    // }
    return (
      <BrowserRouter>
        <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Burgerbuilder} />
          {/* <Redirect to="/" /> */}
        </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
