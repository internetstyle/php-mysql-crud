import React, { Component } from 'react';
import { Box, Button, Table, Columns, Column, Input } from 'bloomer';
import { Link } from 'react-router-dom';
import ReactAutocomplete from 'react-autocomplete';

export default class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.handleProductInput = this.handleProductInput.bind(this);
    this.handleQuantityInput = this.handleQuantityInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct() {
    const { addProduct, id } = this.props;
    addProduct(id);
  }

  handleSelect(value, obj) {
    const { selectProduct } = this.props;
    selectProduct(value, obj);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { submitForm } = this.props;
    submitForm();
  }

  handleProductInput(event) {
    const fieldValue = event.target.value;

    const { onChange } = this.props;
    onChange(fieldValue);
  }

  handleQuantityInput(event) {
    const fieldValue = event.target.value;

    const { onChangeQuantity } = this.props;
    onChangeQuantity(fieldValue);
  }

  render() {
    const {
      products,
      productsSearch,
      value,
      quantity,
      total,
      canSubmit
    } = this.props;
    return (
      <Box>
        <form>
          <Columns>
            <Column>
              <Input
                name="quantity"
                placeholder="Quantidade"
                onChange={this.handleQuantityInput}
                value={quantity}
              />
            </Column>
            <Column>
              <ReactAutocomplete
                items={productsSearch}
                className="input"
                shouldItemRender={(item, val) =>
                  item.label.toLowerCase().indexOf(val.toLowerCase()) > -1
                }
                getItemValue={item => item.label}
                renderItem={(item, highlighted) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: highlighted ? '#eee' : 'transparent'
                    }}
                  >
                    {item.label}
                  </div>
                )}
                value={value}
                onChange={this.handleProductInput}
                onSelect={(val, obj) => this.handleSelect(val, obj)}
                inputProps={{
                  className: 'input',
                  placeholder: 'Buscar produto',
                  name: 'product',
                  style: { width: '100%' }
                }}
                wrapperStyle={{ width: '100%' }}
              />
            </Column>
            <Column>
              <Button isColor="info" isOutlined onClick={this.addProduct}>
                Adicionar produto
              </Button>
            </Column>
          </Columns>
          <hr />
          <Table isStriped isFullWidth>
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Produto</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.ProductId}>
                  <td>{product.Quantity}</td>
                  <td>
                    <strong>{product.Name}</strong>
                  </td>
                  <td>{product.Price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th />
                <th>Total</th>
                <th>{total}</th>
              </tr>
            </tfoot>
          </Table>
          <hr />
          <div className="field is-grouped">
            <div className="control">
              <Button
                isColor="info"
                isOutlined
                onClick={this.handleSubmit}
                disabled={!canSubmit}
              >
                Adicionar pedido
              </Button>
            </div>
            <div className="control">
              <Link to="/orders">
                <Button isOutlined>Voltar</Button>
              </Link>
            </div>
          </div>
        </form>
      </Box>
    );
  }
}
