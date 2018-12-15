import React, { Component } from 'react';
import { Container, Title, Table, Button, Columns, Column } from 'bloomer';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };

    this.orderDelete = this.orderDelete.bind(this);
  }

  componentDidMount() {
    this.loadOrders();
  }

  loadOrders = async () => {
    const response = await api.get(`/orders`);

    const orders = response.data;

    this.setState({
      orders
    });
  };

  orderDelete = async event => {
    const { id } = event.target;
    const response = await api.get(`/orders/delete/${id}`);

    if (response.data.Status === 'OK') {
      const { orders } = this.state;
      const newOrders = orders.filter(obj => obj.OrderId !== id);
      this.setState({
        orders: newOrders
      });
    }
  };

  render() {
    const { orders } = this.state;
    return (
      <div>
        <Header />
        <Container isFluid>
          <Title tag="h1">Pedidos</Title>

          <Columns>
            <Column hasTextAlign="right">
              <Link to="/orders/add">
                <Button isColor="info">Adicionar pedido</Button>
              </Link>
            </Column>
          </Columns>

          <Table isStriped isFullWidth>
            <thead>
              <tr>
                <th>ID</th>
                <th>Total</th>
                <th>Data</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.OrderId}>
                  <td>
                    <strong>{order.OrderId}</strong>
                  </td>
                  <td>{order.Total}</td>
                  <td>{order.Date}</td>
                  <td>
                    <Link to={`/orders/update/${order.OrderId}`}>
                      <Button isColor="info" isOutlined>
                        Visualizar Produtos
                      </Button>
                    </Link>{' '}
                    <Button
                      isColor="danger"
                      isOutlined
                      onClick={this.orderDelete}
                      id={order.OrderId}
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
