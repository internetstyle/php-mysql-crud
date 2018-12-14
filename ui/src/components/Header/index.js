import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarStart
} from 'bloomer';
import brand from '../../assets/brand.svg';

const Header = () => (
  <header id="main-header">
    <Navbar>
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
          <NavbarItem href="#/">Home</NavbarItem>
          <NavbarItem href="#/">Produtos</NavbarItem>
          <NavbarItem href="#/">Pedidos</NavbarItem>
        </NavbarStart>
      </NavbarMenu>
    </Navbar>
  </header>
);

export default Header;
