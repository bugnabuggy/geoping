import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GoogleMapComponent from '../components/googleMapComponent';
import IGoogleMapComponentContainerProps
  from '../componentProps/googleMapComponentProps/googleMapComponentContainerProps';
import {
  addPoints,
  cancelAddNewPoint,
  deleteMarker,
  findLocationForCenterMap,
  markerInstalled,
  moveDragMarker,
  moveEndMarker,
  moveStartMarker,
  permissionToAddMarker,
  putStatusMarker,
  selectedMarker
} from '../actions/googleMapAction';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { editingPermission } from '../actions/checkListAction';

class GoogleMapComponentContainer extends React.Component<IGoogleMapComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <GoogleMapComponent
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
          findLocationForCenterMap={this.props.findLocationForCenterMap}
          deleteMarker={this.props.deleteMarker}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    markers: state.googleMap.markersList,
    isAddMarker: state.googleMap.isAddMarker,
    selectedMarker: state.googleMap.selectedMarker,
    isThereIsNewMarker: state.googleMap.isThereIsNewMarker,
    newMarker: state.googleMap.newMarker,
    isMarkerSaved: state.googleMap.isMarkerSaved,
    isMarkerCanceled: state.googleMap.isMarkerCanceled,
    isMarkerInstalled: state.googleMap.isMarkerInstalled,
    isCheckGeoPosition: state.googleMap.isCheckGeoPosition,
    statusMarker: state.googleMap.statusMarker,
    position: state.googleMap.position,
    deleteIdMarker: state.googleMap.deleteMarker,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
    addPoints,
    selectMarker: selectedMarker,
    moveStartMarker,
    moveDragMarker,
    moveEndMarker,
    permissionToAddMarker,
    editingPermission,
    markerInstalled,
    cancelAddNewPoint,
    putStatusMarker,
    findLocationForCenterMap,
    deleteMarker,
  },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( GoogleMapComponentContainer );