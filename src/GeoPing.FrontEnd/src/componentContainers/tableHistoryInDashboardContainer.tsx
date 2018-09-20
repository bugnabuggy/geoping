import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ITableHistoryDashboardContainerProps from '../componentProps/tableHistoryDashboardContainerProps';
import { TableHistoryDashboard } from '../components/tableHistoryDashboard';

import { history } from '../mocks/dashboardTableMock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TableHistoryDashboardContainer extends React.Component<ITableHistoryDashboardContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <div className="dashboard-table-title">
          <h4 className="">History </h4>
          <div className="dashboard-table-icon cursor-pointer">
            <FontAwesomeIcon icon="filter" />
          </div>
        </div>
          <TableHistoryDashboard
            history={history}
          />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: any ) => {
  return {};
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {}, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( TableHistoryDashboardContainer );