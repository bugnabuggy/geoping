import * as React from 'react';

import GoogleMap from './forms/jsxComponents/googleMap';
import IGoogleMapComponentProps from '../componentProps/googleMapComponentProps/googleMapComponentProps';

export default class GoogleMapComponent extends React.Component<IGoogleMapComponentProps, any> {

  render() {
    return (
      <React.Fragment>
        {this.props.googleMap.position.isSuccess ?
          ( <GoogleMap
            isCheckIn={this.props.isCheckIn}
            checkList={this.props.checkList}
            selectedListId={this.props.selectedListId}
            googleMap={this.props.googleMap}

            selectPoint={this.props.selectPoint}
            addNewPoint={this.props.addNewPoint}
            permissionAdd={this.props.permissionAdd}
            editingPermission={this.props.editingPermission}
            changeMovingGeoPoint={this.props.changeMovingGeoPoint}
            deleteGeoPoint={this.props.deleteGeoPoint}
            addNewPointForMyGeoPosition={this.props.addNewPointForMyGeoPosition}
            geoPointListIsCreate={this.props.geoPointListIsCreate}
            addDistance={this.props.addDistance}
          /> )
          :
          ( <div>Please allow the browser to determine your location.</div> )}
      </React.Fragment>
    );
  }
}
