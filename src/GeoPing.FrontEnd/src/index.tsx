import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getRoutes } from './routers/getRoutes';
import createReducer from './reducers/rootReducer';
import initialState from './state/initialState';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFilter,
  faPlusCircle,
  faTrashAlt,
  faChartBar,
  faShareSquare,
  faCheck,
  faUserPlus,
  faMinus,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add (
  faFilter,
  faPlusCircle,
  faTrashAlt,
  faChartBar,
  faShareSquare,
  faCheck,
  faUserPlus,
  faMinus,
  faMinusCircle,
);

const history = createBrowserHistory ();

const middleware = routerMiddleware ( history );

const store = createStore (
  createReducer ( {} ),
  initialState,
  composeWithDevTools (
    applyMiddleware (
      thunk,
      // logger,
      middleware
    )
  )
);

ReactDOM.render (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {getRoutes ()}
    </ConnectedRouter>
  </Provider>,
  document.getElementById ( 'app' )
);
