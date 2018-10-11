import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GoogleMapComponent from '../components/googleMapComponent';
import IGoogleMapComponentContainerProps
  from '../componentProps/googleMapComponentProps/googleMapComponentContainerProps';
import {
  addDistance,
  addPoints,
  cancelAddNewPoint,
  deleteMarker,
  findLocationForCenterMap,
  markerInstalled,
  markerRender,
  moveDragMarker,
  moveEndMarker,
  moveStartMarker,
  permissionToAddMarker,
  putStatusMarker,
  selectedMarker,
  userMarkerCreate
} from '../actions/googleMapAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { editingPermission } from '../actions/checkListAction';

class GoogleMapComponentContainer extends React.Component<IGoogleMapComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <GoogleMapComponent
          googleMap={this.props.googleMap}
          isEditing={this.props.isEditing}
          selectedListId={this.props.selectedListId}
          isCheckIn={this.props.isCheckIn}

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
          userMarkerCreate={this.props.userMarkerCreate}
          markerRender={this.props.markerRender}
          addDistance={this.props.addDistance}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    isCheckIn: state.checkin.isCheckIn,
    isEditing: state.checkList.isEditing,
    selectedListId: state.checkin.selectedListId,
    googleMap: state.googleMap,
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
      userMarkerCreate,
      markerRender,
      addDistance,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( GoogleMapComponentContainer );