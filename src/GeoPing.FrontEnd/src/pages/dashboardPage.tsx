import * as React from 'react';

import { IDashboardPageProps } from '../componentProps/dashboardPageProps';
import TableHistoryDashboardContainer from '../componentContainers/tableHistoryInDashboardContainer';
import MyCheckListsContainer from '../componentContainers/myCheckListsContainer';
import ShareCheckListModalComponentContainer from '../componentContainers/shareCheckListModalComponentContainer';
import InvitationsDashbordContainer from '../componentContainers/invitationsDashbordContainer';
import ModalChecklistComponentContainer from '../componentContainers/modalChecklistComponentContainer';

export default class DashboardPage extends React.Component<IDashboardPageProps, any> {

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-container">
          <span><h2 className="dashboard-title">Dashboard</h2></span>
          <div className="dashboard-table">
            <TableHistoryDashboardContainer/>
          </div>
          <div className="dashboard-check-list">
            <ModalChecklistComponentContainer/>
            <MyCheckListsContainer/>
          </div>
          <div className="dashboard-invitations">
            <InvitationsDashbordContainer/>
          </div>
        </div>
        <ShareCheckListModalComponentContainer/>
      </React.Fragment>
    );
  }
}
