import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ITableHistoryDashboardContainerProps from '../componentProps/tableHistoryDashboardContainerProps';
import { TableHistoryDashboard } from '../components/tableHistoryDashboard';
import { filterHistory, closeFilterHistory } from '../actions/historyAction';
import { history } from '../mocks/dashboardTableMock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import ModalFilterHistoryComponent from '../components/modalComponents/modalFilterHistoryComponent';

class TableHistoryDashboardContainer extends React.Component<ITableHistoryDashboardContainerProps, any> {
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
          <TableHistoryDashboard
            history={history}
          />
        <ModalFilterHistoryComponent
          show={this.props.show}
          closeFilterHistory={this.props.closeFilterHistory}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    tableHistory: state.tableHistory,
    show: state.tableHistory.showHistoryFilter
  };
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators (
    {
      filterHistory,
      closeFilterHistory
  },
    dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( TableHistoryDashboardContainer );