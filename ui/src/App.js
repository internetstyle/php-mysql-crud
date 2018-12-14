import React from 'react';
import 'bulma';
import { Footer, Container, Columns, Column } from 'bloomer';
import Routes from './routes';

const App = () => (
  <div className="App" style={{ marginTop: 72 }}>
    <Routes />
    <Footer id="footer">
      <Container>
        <Columns>
          <Column isFull hasTextAlign="centered">
            <p>Made by Patrick Coutinho</p>
          </Column>
        </Columns>
      </Container>
    </Footer>
  </div>
);

export default App;
