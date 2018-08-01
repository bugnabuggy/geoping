import * as React from 'react';
import { Switch } from 'react-router-dom';

import { ListOfRoutes } from './routerComponent';
import { map } from './routerMap';

export const getRoutes = () => {
  return (
    <Switch>
      <ListOfRoutes
        mapComponent={map}
      />
    </Switch>
  );
};