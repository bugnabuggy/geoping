import * as React from 'react';

import GoogleMap from './forms/jsxComponents/googleMap';
import IGoogleMapComponentProps from '../componentProps/googleMapComponentProps/googleMapComponentProps';

export default class GoogleMapComponent extends React.Component<IGoogleMapComponentProps, any> {
  componentDidMount() {
    this.props.findLocationForCenterMap();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.googleMap.position.isSuccess ?
          ( <GoogleMap
            isCheckIn={this.props.isCheckIn}
            isEditing={this.props.isEditing}
            selectedListId={this.props.selectedListId}
            googleMap={this.props.googleMap}

            selectMarker={this.props.selectMarker}
            moveStartMarker={this.props.moveStartMarker}
            moveDragMarker={this.props.moveDragMarker}
            moveEndMarker={this.props.moveEndMarker}
            permissionToAddMarker={this.props.permissionToAddMarker}
            editingPermission={this.props.editingPermission}
            markerInstalled={this.props.markerInstalled}
            cancelAddNewPoint={this.props.cancelAddNewPoint}
            putStatusMarker={this.props.putStatusMarker}
            deleteMarker={this.props.deleteMarker}
            userMarkerCreate={this.props.userMarkerCreate}
            markerRender={this.props.markerRender}
            addDistance={this.props.addDistance}
          /> )
          :
          ( <div>fsdfsdf</div> )}
      </React.Fragment>
    );
  }
}