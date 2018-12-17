import React, { Component } from 'react';
import { Box, Button, Input } from 'bloomer';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';

export default class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: [false, false, false],
      color: {
        Name: '',
        Sku: '',
        Price: ''
      },
      canSubmit: false,
      priceClass: 'input'
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCanSubmit = this.handleCanSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const { type } = this.props;

    this.buttonText = 'Cadastrar';
    if (type === 'edit') {
      this.buttonText = 'Editar';
    }
  }

  handleFieldChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const validPos = {
      Name: 0,
      Sku: 1
    };

    const { isValid, color } = this.state;

    if (fieldName !== 'Description') {
      if (fieldValue.length > 0) {
        isValid[validPos[fieldName]] = true;
        color[fieldName] = 'success';

        this.setState({ isValid, color });
      } else {
        isValid[validPos[fieldName]] = false;
        color[fieldName] = 'danger';

        this.setState({ isValid, color });
      }
    }

    const { onChange } = this.props;
    onChange(fieldName, fieldValue);

    this.handleCanSubmit();
  }

  handlePriceChange(event, maskedvalue, floatvalue) {
    const { isValid, color } = this.state;

    if (floatvalue > 0) {
      isValid[2] = true;
      color.Price = 'success';

      this.setState({ isValid, color, priceClass: 'input is-success' });
    } else {
      isValid[2] = false;
      color.Price = 'danger';

      this.setState({ isValid, color, priceClass: 'input is-danger' });
    }

    const { onChange } = this.props;
    onChange('Price', floatvalue);

    this.handleCanSubmit();
  }

  handleCanSubmit() {
    const { isValid } = this.state;
    const canSubmit = isValid.every(item => item);

    this.setState({ canSubmit });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { submitForm } = this.props;
    submitForm();
  }

  render() {
    const { values } = this.props;
    const { canSubmit, color, priceClass } = this.state;
    return (
      <Box>
        <form>
          <div className="control">
            <Input
              name="Name"
              className="input"
              type="text"
              placeholder="Nome"
              onChange={this.handleFieldChange}
              onBlur={this.handleFieldChange}
              value={values.Name}
              isColor={color.Name}
            />
          </div>
          <hr />
          <div className="control">
            <Input
              name="Sku"
              className="input"
              type="text"
              placeholder="SKU"
              onChange={this.handleFieldChange}
              onBlur={this.handleFieldChange}
              value={values.Sku}
              isColor={color.Sku}
            />
          </div>
          <hr />
          <div className="control">
            <textarea
              name="Description"
              className="textarea"
              placeholder="Descrição"
              onChange={this.handleFieldChange}
              value={values.Description}
            />
          </div>
          <hr />
          <div className="control">
            <CurrencyInput
              name="Price"
              className={priceClass}
              type="text"
              placeholder="Preço"
              value={
                values.Price.length
                  ? values.Price.replace('.', ',')
                  : values.Price
              }
              decimalSeparator=","
              thousandSeparator="."
              onChangeEvent={this.handlePriceChange}
              prefix="R$ "
            />
          </div>
          <hr />
          <div className="field is-grouped">
            <div className="control">
              <Button
                isColor="info"
                isOutlined
                onClick={this.handleSubmit}
                disabled={!canSubmit}
              >
                {this.buttonText}
              </Button>
            </div>
            <div className="control">
              <Link to="/products">
                <Button isOutlined>Voltar</Button>
              </Link>
            </div>
          </div>
        </form>
      </Box>
    );
  }
}
