import React, { Component } from 'react';
import { Container, Title, Table, Button, Columns, Column } from 'bloomer';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import api from '../../services/api';
import Header from '../../components/Header';
import OrderModal from '../../components/OrderModal';
import 'moment-timezone'; // eslint-disable-line
import 'moment/locale/pt'; // eslint-disable-line

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
                  <td>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(order.Total)}
                  </td>
                  <td>
                    <Moment fromNow>{order.Date}</Moment>
                  </td>
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
