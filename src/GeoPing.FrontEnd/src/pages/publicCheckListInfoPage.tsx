import * as React from 'react';
import IPublicCheckListInfoPageProps from '../pageProps/publicCheckListInfoPageProps';
import PublicListInfoContainer from '../componentContainers/publicListInfoContainer';
import GoogleMapComponentContainer from '../componentContainers/googleMapComponentContainer';

export class PublicCheckListInfoPage extends React.Component<IPublicCheckListInfoPageProps, any> {
  render() {
    return (
      <div className="public-check-list-info-container">
        <PublicListInfoContainer
          listId={this.props.match.params.listId}
        />
        <div className="public-check-list-info-map-container">
          <GoogleMapComponentContainer/>
        </div>
      </div>
    );
  }
}