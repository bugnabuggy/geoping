import * as React from 'react';
import { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import HeaderComponentContainer from '../componentContainers/headerComponentContainer';
import NotificationComponentContainer from '../componentContainers/notificationComponentContainer';
import IRoutesComponentProps from '../componentProps/routerProps/routesComponentProps';
import { ERoleUser } from '../types/stateTypes/userStateType';
import routersMap from '../mapForComponents/routersMap';
import { notFoundUrl } from '../constants/routes';

export default class Routes extends React.Component<IRoutesComponentProps, any> {

  renderRouters( authorize: boolean, userRole: ERoleUser ) {
    return routersMap( authorize, userRole ).map(
      ( item: { path: string, component: ReactNode, exact: boolean }, index: number ) => {
        const Component: any = item.component;
        return (
          <Route
            key={index}
            exact={item.exact}
            // exact={true}
            path={item.path}
            component={Component}
          />
        );
      } );
  }

  render() {
    const component: any = (
      <Switch>
        {this.renderRouters( this.props.authorized, this.props.roleUser )}

        <Redirect from="*" to={notFoundUrl}/>
      </Switch>
    );
    return (
      <React.Fragment>
        {this.props.path !== notFoundUrl ?
          <header>
            <HeaderComponentContainer/>
          </header>
          :
          <div/>}
        <main>
          <NotificationComponentContainer/>
          {component}
        </main>
        <footer>
          <a href="https://github.com/bugnabuggy/geoping">project on git hub</a>
        </footer>
      </React.Fragment>
    );
  }
}
