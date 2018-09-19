import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ITableHistoryDashboardContainerProps from '../componentProps/tableHistoryDashboardContainerProps';
import { TableHistoryDashboard } from '../components/tableHistoryDashboard';

import { history } from '../mocks/dashboardTableMock';

class TableHistoryDashboardContainer extends React.Component<ITableHistoryDashboardContainerProps, any> {
  render() {
    return (
      <React.Fragment>
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