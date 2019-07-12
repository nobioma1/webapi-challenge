import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import ProjectList from './ProjectList';
import ProjectDetails from './ProjectDetails';

const AppContainer = styled.div`
  margin: auto;
  width: 680px;

  a {
    text-decoration: none;
    color: dodgerblue;
  }
`;

const App = () => {
  return (
    <Router>
      <Switch>
        <AppContainer>
          <Route exact path="/" component={ProjectList} />
          <Route path="/:id/details" component={ProjectDetails} />
        </AppContainer>
      </Switch>
    </Router>
  );
};

export default App;
