import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarStart
} from 'bloomer';
import { Link } from 'react-router-dom';
import brand from '../../assets/brand.svg';

const Header = () => (
  <header id="main-header">
    <Navbar className="is-fixed-top">
      <NavbarBrand>
        <NavbarItem>
          <img
            src={brand}
            style={{ marginRight: 5 }}
            alt="PHP-MySQL-CRUD React UI"
          />
        </NavbarItem>
      </NavbarBrand>
      <NavbarMenu>
        <NavbarStart>
          <NavbarItem tag={Link} to="/">
            Home
          </NavbarItem>
          <NavbarItem tag={Link} to="/products">
            Produtos
          </NavbarItem>
          <NavbarItem tag={Link} to="/orders">
            Pedidos
          </NavbarItem>
        </NavbarStart>
      </NavbarMenu>
    </Navbar>
  </header>
);

export default Header;
