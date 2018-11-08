import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../types/stateTypes/initialStateType';
import ICheckinStatisticsComponentContainerProps
  from '../componentContainerProps/checkinStatisticsComponentContainerProps';
import { CheckinStatisticsComponent } from '../components/checkinStatisticsComponent';
import TableMarkerStatisticsComponentContainer from '../componentContainers/tableMarkerStatisticsComponentContainer';
import {
  checkInStatisticsClear,
  getAllCheckForList,
  loadLists,
  loadPoints,
  loadUsers
} from '../actions/checkinStatisticsActions';

class CheckinStatisticsComponentContainer extends React.Component<ICheckinStatisticsComponentContainerProps, any> {
  componentDidMount() {
    this.props.loadLists();
    if ( this.props.listId ) {
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

          loadUsers={this.props.loadUsers}
          loadPoints={this.props.loadPoints}
          getAllCheckForList={this.props.getAllCheckForList}
        />
        <TableMarkerStatisticsComponentContainer/>
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
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckinStatisticsComponentContainer );