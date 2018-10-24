import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GoogleMapComponent from '../components/googleMapComponent';
import IGoogleMapComponentContainerProps
  from '../componentProps/googleMapComponentProps/googleMapComponentContainerProps';
import {
  addDistance,
  addNewPoint,
  changeMovingGeoPoint,
  clearStateGoogleMap,
  deleteGeoPoint,
  findGeoPosition,
  geoPointListIsCreate,
  getMyAddress,
  permissionAdd,
  selectPoint
} from '../actions/googleMapAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { addNewPointForMyGeoPosition, editingPermission } from '../actions/checkListAction';

class GoogleMapComponentContainer extends React.Component<IGoogleMapComponentContainerProps, any> {
  componentDidMount() {
    this.props.findGeoPosition();
  }

  componentWillUnmount() {
    this.props.clearStateGoogleMap();
  }

  render() {
    return (
      <React.Fragment>
        <GoogleMapComponent
          googleMap={this.props.googleMap}
          checkList={this.props.checkList}
          selectedListId={this.props.selectedListId}
          isCheckIn={this.props.isCheckIn}

          selectPoint={this.props.selectPoint}
          addNewPoint={this.props.addNewPoint}
          permissionAdd={this.props.permissionAdd}
          editingPermission={this.props.editingPermission}
          changeMovingGeoPoint={this.props.changeMovingGeoPoint}
          deleteGeoPoint={this.props.deleteGeoPoint}
          addNewPointForMyGeoPosition={this.props.addNewPointForMyGeoPosition}
          geoPointListIsCreate={this.props.geoPointListIsCreate}
          addDistance={this.props.addDistance}
          getMyAddress={this.props.getMyAddress}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    isCheckIn: state.checkin.isCheckIn,
    checkList: state.checkList,
    selectedListId: state.checkin.selectedListId,
    googleMap: state.googleMap,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      addNewPoint,
      selectPoint,
      findGeoPosition,
      permissionAdd,
      editingPermission,
      changeMovingGeoPoint,
      deleteGeoPoint,
      addNewPointForMyGeoPosition,
      geoPointListIsCreate,
      addDistance,
      clearStateGoogleMap,
      getMyAddress,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( GoogleMapComponentContainer );
