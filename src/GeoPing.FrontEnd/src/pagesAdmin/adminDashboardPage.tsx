import * as React from 'react';
import { Link } from 'react-router-dom';

export default class AdminDashboardPage extends React.Component<any, any> {
  render() {
    return(
      <div className="admin-dashboard-container" >
        <Link to="/admin/allusers" className="admin-dashboard-link" >
          All Users
        </Link>
        <Link to="/admin/allchecklists" className="admin-dashboard-link" >
          All Checklists
        </Link>
      </div>
    );
  }
}