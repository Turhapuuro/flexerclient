import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { Route } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import OverviewPage from './components/overview_page/OverviewPage';
import TaskPage from './components/task_page/TaskPage';
import ProjectPage from './components/project_page/ProjectPage';
import ClientPage from './components/client_page/ClientPage';

import appTheme from './app_theme';
import './App.css';


const theme = createMuiTheme(appTheme);

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
