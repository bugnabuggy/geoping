import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ITableHistoryDashboardContainerProps from '../componentContainerProps/tableHistoryDashboardContainerProps';
import { TableHistoryDashboard } from '../components/tableComponents/tableHistoryDashboard';
import { clearTableHistory, loadHistory } from '../actions/historyAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { filterHistory, closeFilterHistory } from '../actions/historyAction';
import ModalFilterHistoryComponent from '../components/modalComponents/modalFilterHistoryComponent';
import { redirectDashboard } from '../actions/userAction';

class TableHistoryDashboardContainer extends React.Component<ITableHistoryDashboardContainerProps, any> {
  componentDidMount() {
    this.props.loadHistory();

  }
  componentWillUnmount() {
    this.props.clearTableHistory();
  }
  componentDidUpdate(prevProps: ITableHistoryDashboardContainerProps) {
    if ( this.props.user.redirectDashboard ) {
      this.props.redirectDashboard(false);
    }

  }

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-table-title">
          <h4 className="">History</h4>
          <div
            className="dashboard-table-icon cursor-pointer"
            onClick={this.props.filterHistory}
          >
            <FontAwesomeIcon icon="filter" />
          </div>
        </div>
        <ModalFilterHistoryComponent
          show={this.props.tableHistory.showHistoryFilter}
          closeFilterHistory={this.props.closeFilterHistory}
        />
        <TableHistoryDashboard
          tableHistory={this.props.tableHistory}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    tableHistory: state.tableHistory,
    user: state.user,
  };
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators (
    {
      filterHistory,
      loadHistory,
      closeFilterHistory,
      clearTableHistory,
      redirectDashboard,
  },
    dispatch );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( TableHistoryDashboardContainer );