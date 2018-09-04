import * as React from 'react';
import { LinkHeaderComponent } from './linkHeaderComponent';
import IHeaderComponentProps from '../componentProps/headerComponentProps/headerComponentProps';
import { mapLinksAuthorizedUser, mapLinksNotAuthorizedUser } from '../mapForComponents/mapsForHeader/mapsHeaderLinks';

export class HeaderComponent extends React.Component<IHeaderComponentProps, any> {

  renderLinkIfUserNotAuthorize = () => {
    return this.renderLinkIfUserAuthorized(mapLinksNotAuthorizedUser[this.props.path]);
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
            {false ? this.renderLinkIfUserAuthorized ( mapLinksAuthorizedUser ) : this.renderLinkIfUserNotAuthorize ()}
          </div>
        </div>
      </div>
    );
  }
}