import React, { Component } from 'react';
import { Container, Title, Table, Button, Columns, Column } from 'bloomer';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const response = await api.get(`/products`);

    const products = response.data;

    this.setState({
      products
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <Header />
        <Container isFluid>
          <Title tag="h1">Produtos</Title>

          <Columns>
            <Column hasTextAlign="right">
              <Link to="/products/add">
                <Button isColor="info">Adicionar produto</Button>
              </Link>
            </Column>
          </Columns>

          <Table isBordered isStriped isNarrow isFullWidth>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.ProductId}>
                  <td>
                    <strong>{product.Name}</strong>
                  </td>
                  <td>{product.Description}</td>
                  <td>{product.Price}</td>
                  <td />
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
