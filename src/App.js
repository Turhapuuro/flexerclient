import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { Route } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import OverviewPage from './components/overview_page/OverviewPage';
import TaskPage from './components/task_page/TaskPage';
import ProjectPage from './components/project_page/ProjectPage';
import ClientPage from './components/client_page/ClientPage';

// import logo from './logo.svg';
import './App.css';


const theme = createMuiTheme({
  palette: {
    // primary: purple[200],
    // secondary: green[200],
  },
  overrides: {
    // MuiDivider: {
    //   root: {
    //     height: 5,
    //     margin: '20px auto',
    //     width: '50%',
    //     backgroundColor: `${blue[400]} !important`,
    //   },
    // },
  },
});

/* Commented out for future reference
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Epic change!</h1>
  </header>
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>
</div> */

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <header>
          <Navigation />
        </header>
        <main>
          <Route exact path="/" component={TaskPage} />
          <Route exact path="/view/overview" component={OverviewPage} />
          <Route exact path="/view/projects" component={ProjectPage} />
          <Route exact path="/view/clients" component={ClientPage} />
        </main>
      </MuiThemeProvider>
    );
  }
}

export default App;
