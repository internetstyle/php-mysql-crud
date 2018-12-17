import React, { Component } from 'react';
import { Container, Title, Table, Button, Columns, Column } from 'bloomer';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';
import OrderModal from '../../components/OrderModal';

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      modalIsActive: false,
      openOrder: {}
    };

    this.orderDelete = this.orderDelete.bind(this);
    this.openOrder = this.openOrder.bind(this);
    this.closeOrder = this.closeOrder.bind(this);
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

  openOrder = async event => {
    const { id } = event.target;
    const response = await api.get(`/orders/view/${id}`);

    if (response.data.OrderId !== undefined) {
      this.setState({
        openOrder: response.data,
        modalIsActive: true
      });
    }
  };

  closeOrder() {
    this.setState({
      modalIsActive: false
    });
  }

  render() {
    const { orders, modalIsActive, openOrder } = this.state;
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

          <OrderModal
            isActive={modalIsActive}
            openOrder={openOrder}
            closeOrder={this.closeOrder}
          />

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
                    <Button
                      isColor="info"
                      isOutlined
                      id={order.OrderId}
                      onClick={this.openOrder}
                    >
                      Visualizar Produtos
                    </Button>{' '}
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
