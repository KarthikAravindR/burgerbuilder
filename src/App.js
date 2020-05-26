import React from 'react';
import Layout from './components/Layout/Layout';
import Burgerbuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/container/Checkout/Checkout'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import Orders from './container/Checkout/Orders/Orders' 



function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Switch>
      <Route path="/checkout"component={Checkout}/>
      <Route path="/orders"component={Orders}/>
      <Route path="/" component={Burgerbuilder}/> 
      </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
