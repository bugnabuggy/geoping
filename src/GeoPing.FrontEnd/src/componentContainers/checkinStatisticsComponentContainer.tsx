import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import ICheckinStatisticsComponentContainerProps
  from '../componentContainersProps/checkinStatisticsComponentContainerProps';
import { CheckinStatisticsComponent } from '../components/checkinStatisticsComponent';
import TableMarkerStatisticsComponentContainer from '../componentContainers/tableMarkerStatisticsComponentContainer';
import { loadLists, loadPoints, loadUsers } from '../actions/checkinStatisticsActions';

class CheckinStatisticsComponentContainer extends React.Component<ICheckinStatisticsComponentContainerProps, any> {
  componentDidMount() {
    this.props.loadLists();
  }

  render() {
    return (
      <React.Fragment>
        <CheckinStatisticsComponent
          checkinStatistics={this.props.checkinStatistics}

          loadUsers={this.props.loadUsers}
          loadPoints={this.props.loadPoints}
        />
        <TableMarkerStatisticsComponentContainer/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    checkinStatistics: state.checkinStatistics,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadLists,
      loadUsers,
      loadPoints,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckinStatisticsComponentContainer );