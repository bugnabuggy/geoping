import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ITableHistoryDashboardContainerProps from '../componentProps/tableHistoryDashboardContainerProps';
import { TableHistoryDashboard } from '../components/tableHistoryDashboard';
import { filterHistory, closeFilterHistory } from '../actions/historyAction';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import ModalFilterHistoryComponent from '../components/modalComponents/modalFilterHistoryComponent';
import { loadHistory } from '../actions/historyAction';

class TableHistoryDashboardContainer extends React.Component<ITableHistoryDashboardContainerProps, any> {
  componentDidMount() {
    this.props.loadHistory();
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
          show={this.props.show}
          closeFilterHistory={this.props.closeFilterHistory}
        />
        <TableHistoryDashboard
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    tableHistory: state.tableHistory,
    show: state.tableHistory.showHistoryFilter,
    history: state.tableHistory.history,
  };
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators (
    {
      filterHistory,
      loadHistory,
      closeFilterHistory
  },
    dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( TableHistoryDashboardContainer );