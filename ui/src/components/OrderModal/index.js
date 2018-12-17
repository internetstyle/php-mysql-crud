import React, { Component } from 'react';
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardFooter,
  ModalCardBody,
  Button,
  Delete,
  Box,
  Columns,
  Column,
  Table
} from 'bloomer';
import Moment from 'react-moment';
import 'moment-timezone'; // eslint-disable-line
import 'moment/locale/pt'; // eslint-disable-line

export default class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { closeOrder } = this.props;
    closeOrder();
  }

  render() {
    const { isActive, openOrder: order } = this.props;
    return (
      <Modal isActive={isActive}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Pedido {order.OrderId}</ModalCardTitle>
            <Delete onClick={this.closeModal} />
          </ModalCardHeader>
          <ModalCardBody>
            <Box>
              <Columns>
                <Column>
                  Data: <Moment fromNow>{order.Date}</Moment>
                </Column>
                <Column>
                  Total:{' '}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(order.Total)}
                </Column>
              </Columns>
            </Box>
            <Table isStriped isFullWidth>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {order.orders_products !== undefined
                  ? Array.from(order.orders_products).map(product => (
                      <tr key={product.ProductId}>
                        <td>{product.Sku}</td>
                        <td>
                          <strong>{product.Name}</strong>
                        </td>
                        <td>{product.Quantity}</td>
                        <td>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(product.Price)}
                        </td>
                      </tr>
                    ))
                  : false}
              </tbody>
            </Table>
          </ModalCardBody>
          <ModalCardFooter>
            <Button isColor="info" onClick={this.closeModal}>
              Fechar
            </Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    );
  }
}
