import React, { Component } from 'react';
import { Container, Title } from 'bloomer';
import Header from '../../components/Header';
import api from '../../services/api';
import ProductForm from '../../components/ProductForm';

export default class ProductsAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: '',
      Sku: '',
      Description: '',
      Price: ''
    };

    this.getValue = this.getValue.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  getValue(name, value) {
    this.setState({
      [name]: value
    });
  }

  submitForm = async () => {
    const { Name, Sku, Description, Price } = this.state;
    const { history } = this.props;
    const data = {
      Name,
      Sku,
      Description,
      Price
    };

    const response = await api.post(`/products/create`, data);

    if (response.data.Status === 'OK') {
      history.push('/products');
    } else {
      console.log(response);
    }
  };

  render() {
    return (
      <div>
        <Header />
        <Container isFluid>
          <Title tag="h1">Adicionar Produto</Title>
          <ProductForm
            type="add"
            values={this.state}
            onChange={this.getValue}
            submitForm={this.submitForm}
          />
        </Container>
      </div>
    );
  }
}
