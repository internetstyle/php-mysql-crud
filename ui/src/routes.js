import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Products from './pages/products';
import ProductsAdd from './pages/products/add';
import ProductsUpdate from './pages/products/edit';
import Orders from './pages/orders';
import OrdersAdd from './pages/orders/add';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/products/add" component={ProductsAdd} />
      <Route path="/products/update/:id" component={ProductsUpdate} />
      <Route path="/products/" component={Products} />
      <Route path="/orders/add" component={OrdersAdd} />
      <Route path="/orders/" component={Orders} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
