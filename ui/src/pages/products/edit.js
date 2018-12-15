import React, { Component } from 'react';
import { Container, Title } from 'bloomer';
import Header from '../../components/Header';
import api from '../../services/api';
import ProductForm from '../../components/ProductForm';

export default class ProductsEdit extends Component {
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

  componentDidMount() {
    this.loadProduct();
  }

  getValue(name, value) {
    this.setState({
      [name]: value
    });
  }

  loadProduct = async () => {
    const { match } = this.props;

    const response = await api.put(`/products/view/${match.params.id}`);

    const { Name, Sku, Description, Price } = response.data;

    this.setState({
      Name,
      Description,
      Sku,
      Price
    });
  };

  submitForm = async () => {
    const { match } = this.props;
    const { Name, Sku, Description, Price } = this.state;
    const { history } = this.props;
    const data = {
      Name,
      Sku,
      Description,
      Price
    };

    const response = await api.post(
      `/products/update/${match.params.id}`,
      data
    );

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
          <Title tag="h1">Editar Produto</Title>
          <ProductForm
            type="edit"
            values={this.state}
            onChange={this.getValue}
            submitForm={this.submitForm}
          />
        </Container>
      </div>
    );
  }
}
