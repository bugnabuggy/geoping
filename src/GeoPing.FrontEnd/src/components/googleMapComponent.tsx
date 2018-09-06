import * as React from 'react';

import GoogleMap from './forms/jsxComponents/googleMap';

export default class GoogleMapComponent extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <GoogleMap
          positions={this.props.positions}
          isAddMarker={this.props.isAddMarker}

          permissionToAddMarker={this.props.permissionToAddMarker}
        />
      </React.Fragment>
    );
  }
}