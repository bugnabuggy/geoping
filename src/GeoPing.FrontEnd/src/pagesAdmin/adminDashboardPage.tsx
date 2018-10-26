import * as React from 'react';
import { Link } from 'react-router-dom';
import IAdminDashboardPageProps from '../pageAdminProps/adminDashboardPageProps';
import { adminAllCheckLists, adminAllUsersUrl } from '../constants/routes';

export default class AdminDashboardPage extends React.Component<IAdminDashboardPageProps, any> {
  render() {
    return(
      <div className="admin-dashboard-container" >
        <Link to={adminAllUsersUrl} className="admin-dashboard-link" >
          All Users
        </Link>
        <Link to={adminAllCheckLists} className="admin-dashboard-link" >
          All Checklists
        </Link>
      </div>
    );
  }
}