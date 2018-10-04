import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import GetRoutes from './routers/getRoutes';
import createReducer from './reducers/rootReducer';
import initialState from './state/initialState';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faCalendarAlt,
  faChartBar,
  faCheck,
  faFilter,
  faGlobeAfrica,
  faMinus,
  faMinusCircle,
  faPencilAlt,
  faPlusCircle,
  faPlusSquare,
  faShareSquare,
  faStar,
  faTimes,
  faSort,
  faSortUp,
  faSortDown,
  faTrashAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import { faCheckCircle, far, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

library.add(
  faFilter,
  faPlusCircle,
  faTrashAlt,
  faChartBar,
  faShareSquare,
  faCheck,
  faUserPlus,
  faMinus,
  faMinusCircle,
  faStar,
  faGlobeAfrica,
  faPlusSquare,
  faBars,
  faTimes,
  faPencilAlt,
  faCalendarAlt,
  faCheckCircle,
  faTimesCircle,
  faSort,
  faSortUp,
  faSortDown,
  far
);

const history = createBrowserHistory();

const middleware = routerMiddleware( history );

const store = createStore(
  createReducer( {} ),
  initialState,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      // logger,
      middleware
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <GetRoutes/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById( 'app' )
);
