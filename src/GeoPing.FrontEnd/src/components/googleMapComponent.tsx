import * as React from 'react';

import GoogleMap from './forms/jsxComponents/googleMap';
import IGoogleMapComponentProps from '../componentProps/googleMapComponentProps/googleMapComponentProps';

export default class GoogleMapComponent extends React.Component<IGoogleMapComponentProps, any> {
  componentDidMount() {
    this.props.findLocationForCenterMap ();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.position.isSuccess ?
          ( <GoogleMap
              markers={this.props.markers}
              isAddMarker={this.props.isAddMarker}
              selectedMarker={this.props.selectedMarker}
              isThereIsNewMarker={this.props.isThereIsNewMarker}
              newMarker={this.props.newMarker}
              isMarkerCanceled={this.props.isMarkerCanceled}
              isMarkerSaved={this.props.isMarkerSaved}
              isMarkerInstalled={this.props.isMarkerInstalled}
              isCheckGeoPosition={this.props.isCheckGeoPosition}
              statusMarker={this.props.statusMarker}
              position={this.props.position}
              deleteIdMarker={this.props.deleteIdMarker}

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
            />
          )
          :
          ( <div>fsdfsdf</div> )}
      </React.Fragment>
    );
  }
}