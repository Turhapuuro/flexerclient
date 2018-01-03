import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import logo from './logo.svg';
import './App.css';

import { blue } from 'material-ui/colors';

import Jaahas from './components/Jaahas';

const theme = createMuiTheme({
  palette: {
    // primary: purple[200],
    // secondary: green[200],
  },
  overrides: {
    MuiDivider: {
      root: {
        height: 5,
        margin: '20px auto',
        width: '50%',
        backgroundColor: `${blue[400]} !important`,
      },
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Epic change!</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Jaahas />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
