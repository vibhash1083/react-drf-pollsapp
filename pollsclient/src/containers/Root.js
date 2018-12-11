import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { Router, browserHistory } from 'react-router';

import Routes from './Routes';

export default class Root extends Component {

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} routes={Routes} />
        </div>
      </Provider>
    );
  }
}
