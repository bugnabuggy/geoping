import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../types/stateTypes/initialStateType';
import { CheckListGeoPointComponent } from '../components/checkListGeoPointComponent';
import { ListPointsComponent } from '../components/listPointsComponent';
import ICheckListComponentContainerProps from '../componentContainerProps/checkListComponentContainerProps';
import { addNewPointForMyGeoPosition, clearStateCheckList, loadCheckListData } from '../actions/checkListAction';
import { CheckListLinkComponent } from '../components/checkListLinkComponent';
import { addNotification, deleteNotification } from '../actions/notificationsAction';
import {
  addNewPoint,
  cancelGeoPoint,
  changeDataGeoPoint,
  deleteGeoPoint,
  permissionAdd,
  saveGeoPoint,
  selectPoint
} from '../actions/googleMapAction';

class CheckListComponentContainer extends React.Component<ICheckListComponentContainerProps, any> {
  componentDidMount() {
    this.props.loadCheckListData( '', this.props.idCheckList );
  }

  componentWillUnmount() {
    this.props.clearStateCheckList();
  }

  render() {
    return (
      <React.Fragment>
        <CheckListLinkComponent
          googleMap={this.props.googleMap}

          permissionAdd={this.props.permissionAdd}
          addNotification={this.props.addNotification}
          deleteNotification={this.props.deleteNotification}
          addNewPoint={this.props.addNewPoint}
          addNewPointForMyGeoPosition={this.props.addNewPointForMyGeoPosition}
        />
        <div className="check-list-point">
          <CheckListGeoPointComponent
            checkList={this.props.checkList}
            googleMap={this.props.googleMap}

            saveGeoPoint={this.props.saveGeoPoint}
            changeDataGeoPoint={this.props.changeDataGeoPoint}
            cancelGeoPoint={this.props.cancelGeoPoint}
          />
        </div>
        <div className="check-list-points-list">
          <ListPointsComponent
            geoPoints={this.props.googleMap.geoPoints}
            selectedGeoPointId={this.props.googleMap.selectedGeoPoint.id}
            statusGeoPoint={this.props.googleMap.statusMarker}
            checkList={this.props.checkList}

            selectPoint={this.props.selectPoint}
            deleteGeoPoint={this.props.deleteGeoPoint}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    checkList: state.checkList,
    googleMap: state.googleMap,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      permissionAdd,
      saveGeoPoint,
      changeDataGeoPoint,
      cancelGeoPoint,
      selectPoint,
      addNotification,
      deleteNotification,
      addNewPoint,
      addNewPointForMyGeoPosition,
      deleteGeoPoint,
      loadCheckListData,
      clearStateCheckList,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckListComponentContainer );
