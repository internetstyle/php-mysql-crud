import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Products from './pages/products';
import ProductsAdd from './pages/products/add';
import Orders from './pages/orders';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/products/add" component={ProductsAdd} />
      <Route path="/products/" component={Products} />
      <Route path="/orders/" component={Orders} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
