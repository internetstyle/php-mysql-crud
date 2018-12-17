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
                <Column>Data: {order.Date}</Column>
                <Column>Total: {order.Total}</Column>
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
                        <td>{product.Price}</td>
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
