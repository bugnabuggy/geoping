import * as React from 'react';

import TableUsersComponentContainer from '../componentContainers/tableUsersComponentContainer';
import FilterUsersComponentContainer from '../componentContainers/filterUsersComponentContainer';
import IAdminAllUserPageProps from '../pageAdminProps/adminAllUserPageProps';

export default class AdminAllUsersPage extends React.Component<IAdminAllUserPageProps, any> {
  render() {
    return (
      <div className="admin-all-users-container">
        <h3>All Users</h3>
        <div className="admin-all-users-filter-container">
          <FilterUsersComponentContainer/>
        </div>
        <div className="admin-all-users-table-container">
          <TableUsersComponentContainer/>
        </div>
      </div>
    );
  }
}