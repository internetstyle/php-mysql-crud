import React, { Component } from 'react';
import { Container, Box, Title, Button } from 'bloomer';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';

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
    this.productAdd = this.productAdd.bind(this);
  }

  getValue(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  productAdd = async () => {
    const { Name, Sku, Description, Price } = this.state;
    const { history } = this.props;
    const data = {
      Name,
      Sku,
      Description,
      Price
    };

    const response = await api.post(`/products/create`, data);
    console.log(response);

    history.push('/products');
  };

  render() {
    const { Name, Sku, Description, Price } = this.state;
    return (
      <div>
        <Header />
        <Container isFluid>
          <Title tag="h1">Adicionar Produto</Title>
          <Box>
            <div className="control">
              <input
                name="Name"
                className="input"
                type="text"
                placeholder="Nome"
                onChange={this.getValue}
                value={Name}
              />
            </div>
            <hr />
            <div className="control">
              <input
                name="Sku"
                className="input"
                type="text"
                placeholder="SKU"
                onChange={this.getValue}
                value={Sku}
              />
            </div>
            <hr />
            <div className="control">
              <textarea
                name="Description"
                className="textarea"
                placeholder="Description"
                onChange={this.getValue}
                value={Description}
              />
            </div>
            <hr />
            <div className="control">
              <input
                name="Price"
                className="input"
                type="text"
                placeholder="Preço"
                onChange={this.getValue}
                value={Price}
              />
            </div>
            <hr />
            <div className="field is-grouped">
              <div className="control">
                <Button isColor="info" isOutlined onClick={this.productAdd}>
                  Adicionar
                </Button>
              </div>
              <div className="control">
                <Link to="/products">
                  <Button isOutlined>Voltar</Button>
                </Link>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    );
  }
}
