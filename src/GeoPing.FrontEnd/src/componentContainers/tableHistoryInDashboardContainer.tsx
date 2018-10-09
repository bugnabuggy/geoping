import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ITableHistoryDashboardContainerProps from '../componentProps/tableHistoryDashboardContainerProps';
import { TableHistoryDashboard } from '../components/tableHistoryDashboard';
import { loadHistory } from '../actions/historyAction';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class TableHistoryDashboardContainer extends React.Component<ITableHistoryDashboardContainerProps, any> {
  componentDidMount() {
    this.props.loadHistory();
  }

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-table-title">
          <h4 className="">History </h4>
          <div className="dashboard-table-icon cursor-pointer">
            <FontAwesomeIcon icon="filter"/>
          </div>
        </div>
        <TableHistoryDashboard
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    history: state.tableHistory.history,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadHistory,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( TableHistoryDashboardContainer );