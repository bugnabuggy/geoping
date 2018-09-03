import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';

import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import ProfilePage from '../pages/profilePage';
import ChecklistPage from '../pages/checklistPage';
import CheckinPage from '../pages/checkinPage';

export default class Routes extends React.Component<any, any> {

  render() {
    const authorized: boolean = false;

    if ( !authorized ) {
      return (
        <React.Fragment>
          <Switch>
            <Route exact={true} path="/login" component={LoginPage}/>
            <Route exact={true} path="/register" component={LoginPage}/>
            <Route exact={true} path="/resetpassword" component={LoginPage}/>

            <Redirect push={true} from="*" to="/login"/>
          </Switch>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Switch>
          <Route exact={true} path="/dashboard" component={DashboardPage}/>
          <Route exact={true} path="/profile" component={ProfilePage}/>
          <Route exact={true} path="/checklist" component={ChecklistPage}/>
          <Route exact={true} path="/checkin" component={CheckinPage}/>

          <Redirect push={true} from="*" to="/dashboard"/>
        </Switch>
      </React.Fragment>
    );
  }
}