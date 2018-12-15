import React, { Component } from 'react';
import { Box, Button } from 'bloomer';
import { Link } from 'react-router-dom';

export default class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
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

    const { onChange } = this.props;
    onChange(fieldName, fieldValue);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { submitForm } = this.props;
    submitForm();
  }

  render() {
    const { values } = this.props;
    return (
      <Box>
        <form>
          <div className="control">
            <input
              name="Name"
              className="input"
              type="text"
              placeholder="Nome"
              onChange={this.handleFieldChange}
              value={values.Name}
            />
          </div>
          <hr />
          <div className="control">
            <input
              name="Sku"
              className="input"
              type="text"
              placeholder="SKU"
              onChange={this.handleFieldChange}
              value={values.Sku}
            />
          </div>
          <hr />
          <div className="control">
            <textarea
              name="Description"
              className="textarea"
              placeholder="Description"
              onChange={this.handleFieldChange}
              value={values.Description}
            />
          </div>
          <hr />
          <div className="control">
            <input
              name="Price"
              className="input"
              type="text"
              placeholder="Preço"
              onChange={this.handleFieldChange}
              value={values.Price}
            />
          </div>
          <hr />
          <div className="field is-grouped">
            <div className="control">
              <Button isColor="info" isOutlined onClick={this.handleSubmit}>
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
