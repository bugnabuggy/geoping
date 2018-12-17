import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ITableHistoryDashboardContainerProps from '../componentContainerProps/tableHistoryDashboardContainerProps';
import { TableHistoryDashboard } from '../components/tableComponents/tableHistoryDashboard';
import { clearTableHistory, filterHistory, loadHistory } from '../actions/historyAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import ModalFilterHistoryComponent from '../components/modalComponents/modalFilterHistoryComponent';
import { redirectDashboard } from '../actions/userAction';

class TableHistoryDashboardContainer extends React.Component<ITableHistoryDashboardContainerProps, any> {
  constructor( props: ITableHistoryDashboardContainerProps ) {
    super( props );
    this.state = {
      showModalFilter: false,
    };
  }

  componentDidMount() {
    this.props.loadHistory();
  }

  componentWillUnmount() {
    this.props.clearTableHistory();
  }

  componentDidUpdate( prevProps: ITableHistoryDashboardContainerProps ) {
    if ( this.props.user.redirectDashboard ) {
      this.props.redirectDashboard( false );
    }
  }

  openModal = () => {
    this.setState( {
      showModalFilter: true,
    } );
  };
  closeModal = () => {
    this.setState( {
      showModalFilter: false,
    } );
  };

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-table-title">
          <h4 className="">History</h4>
          <div
            className="dashboard-table-icon cursor-pointer"
            onClick={this.openModal}
          >
            <FontAwesomeIcon icon="filter"/>
          </div>
        </div>
        <ModalFilterHistoryComponent
          show={this.state.showModalFilter}
          closeFilterHistory={this.closeModal}
          // filterHistory={this.props.filterHistory}
          loadHistory={this.props.loadHistory}
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
  bindActionCreators(
    {
      filterHistory,
      loadHistory,
      // closeFilterHistory,
      clearTableHistory,
      redirectDashboard,
    },
    dispatch );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( TableHistoryDashboardContainer );