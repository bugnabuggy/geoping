import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IDashboardPageProps } from '../componentProps/dashboardPageProps';
import TableHistoryDashboardContainer from '../componentContainers/tableHistoryInDashboardContainer';
import MyCheckListsContainer from '../componentContainers/myCheckListsContainer';
import ShareCheckListModalComponentContainer from '../componentContainers/shareCheckListModalComponentContainer';
import InvitationsDashbordContainer from '../componentContainers/invitationsDashbordContainer';

export default class DashboardPage extends React.Component<IDashboardPageProps, any> {
  render() {
    return (
      <React.Fragment>
        <div className="dashboard-container">
          <span><h2 className="dashboard-title">Dashboard</h2></span>
          <div className="dashboard-table-title">
            <h4 className="">History </h4>
            <FontAwesomeIcon icon="filter" className="dashboard-table-icon cursor-pointer"/>
          </div>
          <div className="dashboard-table">
            <TableHistoryDashboardContainer/>
          </div>
          <div className="dashboard-check-list-title">
            <h4>My Check lists</h4>
            <FontAwesomeIcon icon="plus-circle" className="dashboard-check-list-icon-pluse cursor-pointer"/>
            <FontAwesomeIcon icon="filter" className="dashboard-check-list-icon-filter cursor-pointer"/>
          </div>
          <div className="dashboard-check-list">
            <MyCheckListsContainer/>
          </div>
          <div className="dashboard-invitations-title">
            <h4>
              Invitations
            </h4>
            <FontAwesomeIcon icon="filter" className="dashboard-table-icon cursor-pointer"/>
          </div>
          <div className="dashboard-invitations">
            <InvitationsDashbordContainer />
          </div>
        </div>
        <ShareCheckListModalComponentContainer/>
      </React.Fragment>
    );
  }
}
