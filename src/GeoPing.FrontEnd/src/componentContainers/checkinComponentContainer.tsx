import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ICheckinComponentContainerProps from '../componentContainerProps/checkinComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { CheckinComponent } from '../components/checkinComponent';
import {
  checkIn,
  checkInClear,
  checkinFlag,
  getGeoListMyAndHasAccess,
  loadLists,
  loadPoints,
  messagesForUser,
  selectList,
  setTimer,
  timerAccount
} from '../actions/checkinAction';
import { ICheckinFunctions } from '../componentProps/checkinComponentProps';
import { addDistance, clearGeoPoint, getMyAddress, selectPoint } from '../actions/googleMapAction';
import { saveHistory } from '../actions/historyAction';
import { loadCheckLists } from '../actions/myCheckListsAction';

class CheckinComponentContainer extends React.Component<ICheckinComponentContainerProps, any> {
  componentDidMount() {
    this.props.getGeoListMyAndHasAccess();
    if ( !this.props.checkin.isCheckIn ) {
      this.props.checkinFlag( true );
    }
  }

  componentWillUnmount() {
    this.props.checkInClear();
  }

  render() {
    const functions: ICheckinFunctions = {
      loadLists: this.props.loadLists,
      loadPoints: this.props.loadPoints,
      selectList: this.props.selectList,
      selectPoint: this.props.selectPoint,
      getMyAddress: this.props.getMyAddress,
      saveHistory: this.props.saveHistory,
      clearGeoPoint: this.props.clearGeoPoint,
      checkIn: this.props.checkIn,
      messagesForUser: this.props.messagesForUser,
      setTimer: this.props.setTimer,
      timerAccount: this.props.timerAccount,
      addDistance: this.props.addDistance,
    };

    return (
      <React.Fragment>
        <CheckinComponent
          checkin={this.props.checkin}
          googleMap={this.props.googleMap}
          checkList={this.props.checkList}
          functions={functions}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    googleMap: state.googleMap,
    checkin: state.checkin,
    checkList: state.checkList,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadLists,
      loadPoints,
      selectList,
      checkinFlag,
      selectPoint,
      getMyAddress,
      saveHistory,
      checkInClear,
      loadCheckLists,
      clearGeoPoint,
      checkIn,
      messagesForUser,
      setTimer,
      timerAccount,
      addDistance,
      getGeoListMyAndHasAccess,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( CheckinComponentContainer );