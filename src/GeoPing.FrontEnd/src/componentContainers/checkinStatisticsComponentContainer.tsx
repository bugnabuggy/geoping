import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../types/stateTypes/initialStateType';
import ICheckinStatisticsComponentContainerProps
  from '../componentContainerProps/checkinStatisticsComponentContainerProps';
import { CheckinStatisticsComponent } from '../components/checkinStatisticsComponent';
import TableMarkerStatisticsComponentContainer from '../componentContainers/tableMarkerStatisticsComponentContainer';
import {
  checkInStatisticsClear, clearStatistic,
  getAllCheckForList, getFreeChecksInStatisticsByFilter,
  loadLists,
  loadPoints,
  loadUsers
} from '../actions/checkinStatisticsActions';
import { clearGeoPoint } from '../actions/googleMapAction';
import { goTo } from '../actions/windowAction';

class CheckinStatisticsComponentContainer extends React.Component<ICheckinStatisticsComponentContainerProps, any> {
  componentDidMount() {
    this.props.loadLists();
    if ( this.props.listId !== 'none') {
      this.props.loadUsers( this.props.listId );
    }
  }

  componentWillUnmount() {
    this.props.checkInStatisticsClear();
  }

  render() {
    return (
      <React.Fragment>
        <CheckinStatisticsComponent
          checkinStatistics={this.props.checkinStatistics}
          checkList={this.props.checkList}
          listId={this.props.listId}
          userId={this.props.userId}

          loadUsers={this.props.loadUsers}
          loadPoints={this.props.loadPoints}
          getAllCheckForList={this.props.getAllCheckForList}
          clearGeoPoint={this.props.clearGeoPoint}
          getFreeChecksInStatisticsByFilter={this.props.getFreeChecksInStatisticsByFilter}
          clearStatistic={this.props.clearStatistic}
          goTo={this.props.goTo}
        />
        <TableMarkerStatisticsComponentContainer
          listId={this.props.listId}
          userId={this.props.userId}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    checkinStatistics: state.checkinStatistics,
    checkList: state.checkList,
    googleMap: state.googleMap,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadLists,
      loadUsers,
      loadPoints,
      checkInStatisticsClear,
      getAllCheckForList,
      clearGeoPoint,
      getFreeChecksInStatisticsByFilter,
      clearStatistic,
      goTo,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( CheckinStatisticsComponentContainer );