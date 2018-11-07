import * as React from 'react';
import { ReactNode } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import HeaderComponentContainer from '../componentContainers/headerComponentContainer';
import NotificationComponentContainer from '../componentContainers/notificationComponentContainer';
import IRoutesComponentProps from '../componentProps/routerProps/routesComponentProps';
import { ERoleUser } from '../types/stateTypes/userStateType';
import { baseUrl } from '../constants/routes';
import routersMap from '../mapForComponents/routersMap';

export default class Routes extends React.Component<IRoutesComponentProps, any> {

  renderRouters( authorize: boolean, userRole: ERoleUser ) {
    return routersMap( authorize, userRole ).map(
      ( item: { path: string, component: ReactNode }, index: number ) => {
        const Component: any = item.component;
        return (
          <Route
            key={index}
            exact={true}
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

        {/*<Redirect push={true} from="*" to={baseUrl}/>*/}
      </Switch>
    );

    return (
      <React.Fragment>
        <header>
          <HeaderComponentContainer/>
        </header>
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