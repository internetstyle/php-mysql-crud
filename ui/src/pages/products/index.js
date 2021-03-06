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

    this.productDelete = this.productDelete.bind(this);
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

  productDelete = async event => {
    const { id } = event.target;
    const response = await api.get(`/products/delete/${id}`);

    if (response.data.Status === 'OK') {
      const { products } = this.state;
      const newProducts = products.filter(obj => obj.ProductId !== id);
      this.setState({
        products: newProducts
      });
    }
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

          <Table isStriped isFullWidth>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.ProductId}>
                  <td>
                    <strong>{product.Name}</strong>
                  </td>
                  <td>{product.Description}</td>
                  <td>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(product.Price)}
                  </td>
                  <td>
                    <Link to={`/products/update/${product.ProductId}`}>
                      <Button isColor="info" isOutlined>
                        Editar
                      </Button>
                    </Link>{' '}
                    <Button
                      isColor="danger"
                      isOutlined
                      onClick={this.productDelete}
                      id={product.ProductId}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
