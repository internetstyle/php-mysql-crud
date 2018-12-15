import React, { Component } from 'react';
import { Container, Title } from 'bloomer';
import Header from '../../components/Header';
import api from '../../services/api';
import OrderForm from '../../components/OrderForm';

export default class OrdersAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      quantity: '1',
      id: '',
      products: [],
      productsSearch: [],
      total: '0'
    };

    this.searchProducts = this.searchProducts.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  onChangeQuantity(quantity) {
    this.setState({ quantity });
  }

  addProduct = async id => {
    const response = await api.get(`/products/view/${id}`);

    const { products, quantity } = this.state;

    response.data.Quantity = quantity;

    let productsUpdate = [...products];
    productsUpdate = productsUpdate.filter(item => item.ProductId !== id);
    productsUpdate.push(response.data);

    let total = 0;
    total = productsUpdate.reduce((a, b) => +a + +b.Price * +b.Quantity, 0);

    this.setState({ products: productsUpdate, id: '', value: '', total });
  };

  searchProducts = async value => {
    this.setState({ value });

    const response = await api.get(`/products/search/${value}`);

    const productsSearch = response.data;

    this.setState({
      productsSearch
    });
  };

  submitForm = async () => {
    const { products } = this.state;
    const { history } = this.props;
    const data = {
      Products: products
    };

    const response = await api.post(`/orders/create`, data);

    if (response.data.Status === 'OK') {
      history.push('/orders');
    } else {
      console.log(response);
    }
  };

  selectProduct(value, obj) {
    this.setState({ value, id: obj.id });
  }

  render() {
    const { products, productsSearch, value, id, quantity, total } = this.state;
    return (
      <div>
        <Header />
        <Container isFluid>
          <Title tag="h1">Adicionar Pedido</Title>
          <OrderForm
            type="add"
            value={value}
            quantity={quantity}
            id={id}
            onChange={this.searchProducts}
            onChangeQuantity={this.onChangeQuantity}
            submitForm={this.submitForm}
            products={products}
            productsSearch={productsSearch}
            selectProduct={this.selectProduct}
            addProduct={this.addProduct}
            total={total}
          />
        </Container>
      </div>
    );
  }
}
