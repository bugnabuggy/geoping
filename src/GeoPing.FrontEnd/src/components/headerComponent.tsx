import * as React from 'react';
import { LinkHeaderComponent } from './linkHeaderComponent';
import IHeaderComponentProps from '../componentProps/headerComponentProps/headerComponentProps';

export class HeaderComponent extends React.Component<IHeaderComponentProps, any> {

  mapLinks: any = [
    {
      text: 'Dashboard',
      path: '/dashboard',
      avatar: false,
    },
    {
      text: 'Check in',
      path: '/checkin',
      avatar: false,
    },
    {
      text: 'About',
      path: '/',
      avatar: false,
    },
    {
      text: '%UserName%',
      path: '/profile',
      avatar: true,
    }
  ];

  renderLinkIfUserNotAuthorize = () => {
    const login: any = {
      text: 'Login',
      path: '/login',
      avatar: false,
    };
    const register: any = {
      text: 'Register',
      path: '/register',
      avatar: false,
    };
    const about: any = {
      text: 'About',
      path: '/',
      avatar: false,
    };
    const componentMap: any = {
      '/': [
        { ...login },
        { ...register },
      ],
      '/login': [
        { ...about },
        { ...register },
      ],
      '/register': [
        { ...about },
        { ...login },
      ],
    };
    return this.renderLinkIfUserAuthorized(componentMap[this.props.path]);
  }

  renderLinkIfUserAuthorized = ( mapComponent: Array<any> ) => {
    const links: Array<any> = mapComponent.map ( ( item: any, index: number ) => {
      const key: string = `${index}_link`;
      return (
        <LinkHeaderComponent
          key={key}
          text={item.text}
          path={item.path}
          avatar={item.avatar}
        />
      );
    } );
    return links;
  }

  render() {
    return (
      <div className="header-container">
        <div className="row align-items-center header-container-row">
          <div className="col-4 ml-5 logo-header">
            Geo Ping
          </div>
          <div className="col-6 ml-auto text-right">
            {false ? this.renderLinkIfUserAuthorized ( this.mapLinks ) : this.renderLinkIfUserNotAuthorize ()}
          </div>
        </div>
      </div>
    );
  }
}