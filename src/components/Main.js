require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

import { Router, Route } from 'react-router';
import Homepage from './HomepageComponent.js';
import EnterprisePage from './EnterprisePageComponent.js';

class AppComponent extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/' component={Homepage} />
        <Route path='/enterprise/:id' component={EnterprisePage} />
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
