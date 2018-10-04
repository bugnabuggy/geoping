import * as React from 'react';
import { LinkHeaderComponent } from './linkHeaderComponent';
import IHeaderComponentProps from '../componentProps/headerComponentProps/headerComponentProps';
import { authorizedLinks, notAuthorizedLinks } from '../mapForComponents/headerComponentFromLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class HeaderComponent extends React.Component<IHeaderComponentProps, any> {
  constructor( props: any ) {
    super ( props );
    this.state = ( {
      showMenu: false
    } );
  }

  handleMenu = () => {
    this.setState ( {
      showMenu: !this.state.showMenu
    } );
  };

  handleSelect = ( e: any ) => {
    this.props.editRouteAction ( e.target.id );
  };

  handleAuthorization = ( e: any ) => {
    this.props.authorizationUser ( 'email', 'pass' );
  };

  renderLinks = ( linksMap: Array<any> ) => {
    const elements: Array<any> = linksMap.map ( ( item: any, index: number ) => {
      const key: string = `${index}_linkHeader`;
      return (
        <LinkHeaderComponent
          key={key}
          id={`${item.path}`}
          path={item.path}
          index={this.props.path}
          text={item.label}
          dropdown={item.dropdown}
          links={item.links}
          roleUser={this.props.roleUser}
        />
      );
    } );
    return elements;
  };

  renderLinkAthorized = () => {
    return (
      <React.Fragment>
        <ul
          className="nav nav-pills"
          onClick={this.handleSelect}
        >
          {this.renderLinks ( authorizedLinks )}
        </ul>
        <img
          src="../assets/images/avatar.png"
          className="rounded-circle"
          width="50px"
          height="40px"
        />
      </React.Fragment>
    );
  };

  renderLinkNotAuthorized = () => {
    return (
      <React.Fragment>
        <ul
          className="nav nav-pills"
          onClick={this.handleSelect}
        >
          {this.renderLinks ( notAuthorizedLinks )}
        </ul>
      </React.Fragment>
    );
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="row align-items-center header-container-row">
          <div className="col-md-3 col-sm-5 logo-header">
            Geo Ping
          </div>
          <div>
            <button onClick={this.handleAuthorization}>Authorization</button>
          </div>
          <button className="adaptive-menu " onClick={this.handleMenu}>
              <FontAwesomeIcon icon="bars"/>
          </button>
          <div className={`col-8 col-lg-6 ml-auto nav nav-pills ${this.state.showMenu} justify-content-end`}>
            {this.props.userAuthorization ? this.renderLinkAthorized () : this.renderLinkNotAuthorized ()}
          </div>
        </div>
      </nav>
    );
  }
}