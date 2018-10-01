import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { CheckListGeoPointComponent } from '../components/checkListGeoPointComponent';
import { ListPointsComponent } from '../components/listPointsComponent';
import ICheckListComponentContainerProps from '../componentProps/checkListComponentContainerProps';
import { checkGEOPosition, editingPermission } from '../actions/checkListAction';
import {
  addNewPoint,
  cancelAddNewPoint,
  cancelEditingGEOPoint,
  changeDataGEOPoint,
  deleteMarker,
  editGEOPoint,
  markerInstalled,
  permissionToAddMarker,
  putStatusMarker,
  selectedMarker
} from '../actions/googleMapAction';
import { CheckListLinkComponent } from '../components/checkListLinkComponent';
import { addNotification, deleteNotification } from '../actions/notificationsAction';

class CheckListComponentContainer extends React.Component<ICheckListComponentContainerProps, any> {

  render() {
    return (
      <React.Fragment>
        <CheckListLinkComponent
          isAddMarker={this.props.isAddMarker}
          isMarkerInstalled={this.props.isMarkerInstalled}
          isMarkerSaved={this.props.isMarkerSaved}
          isMarkerCanceled={this.props.isMarkerCanceled}
          selectedMarker={this.props.selectedMarker}
          isCheckGeoPosition={this.props.isCheckGeoPosition}
          statusMarker={this.props.statusMarker}

          addNewPoint={this.props.addNewPoint}
          permissionToAddMarker={this.props.permissionToAddMarker}
          cancelAddNewPoint={this.props.cancelAddNewPoint}
          addNotification={this.props.addNotification}
          deleteNotification={this.props.deleteNotification}
          checkGEOPosition={this.props.checkGEOPosition}
          editingPermission={this.props.editingPermission}
          markerInstalled={this.props.markerInstalled}
          putStatusMarker={this.props.putStatusMarker}
        />
        <div className="check-list-point">
          <CheckListGeoPointComponent
            isEditingPoint={this.props.isEditingPoint}
            selectedMarker={this.props.selectedMarker}
            isAddMarker={this.props.isAddMarker}
            isMarkerInstalled={this.props.isMarkerInstalled}
            statusMarker={this.props.statusMarker}

            editGEOPoint={this.props.editGEOPoint}
            changeDataGEOPoint={this.props.changeDataGEOPoint}
            cancelEditingGEOPoint={this.props.cancelEditingGEOPoint}
            cancelAddNewPoint={this.props.cancelAddNewPoint}
            markerInstalled={this.props.markerInstalled}
            addNewPoint={this.props.addNewPoint}
            editingPermission={this.props.editingPermission}
            putStatusMarker={this.props.putStatusMarker}
          />
        </div>
        <div className="check-list-points-list">
          <ListPointsComponent
            markers={this.props.markers}
            selectedMarkerId={this.props.selectedMarker.id}

            editingPermission={this.props.editingPermission}
            selectMarker={this.props.selectMarker}
            putStatusMarker={this.props.putStatusMarker}
            deleteMarker={this.props.deleteMarker}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    isEditingPoint: state.checkList.isEditind,
    markers: state.googleMap.markersList,
    selectedMarker: state.googleMap.selectedMarker,
    isAddMarker: state.googleMap.isAddMarker,
    isMarkerInstalled: state.googleMap.isMarkerInstalled,
    isMarkerSaved: state.googleMap.isMarkerSaved,
    isMarkerCanceled: state.googleMap.isMarkerCanceled,
    statusMarker: state.googleMap.statusMarker,
    isCheckGeoPosition: state.googleMap.isCheckGeoPosition,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      editingPermission,
      selectMarker: selectedMarker,
      editGEOPoint,
      changeDataGEOPoint,
      cancelEditingGEOPoint,
      addNewPoint,
      permissionToAddMarker,
      cancelAddNewPoint,
      addNotification,
      deleteNotification,
      checkGEOPosition,
      markerInstalled,
      putStatusMarker,
      deleteMarker,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckListComponentContainer );