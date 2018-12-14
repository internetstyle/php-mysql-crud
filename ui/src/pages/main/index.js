import React from 'react';
import { Container, Box, Title } from 'bloomer';
import Header from '../../components/Header';

const Main = () => (
  <div>
    <Header />
    <Container isFluid>
      <Title tag="h1">Bem-vindo!</Title>
      <Box>CRUD básico utilizando PHP, MySql, ReactJs e Docker.</Box>
    </Container>
  </div>
);

export default Main;
