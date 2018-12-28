import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import HeaderComponentContainer from '../componentContainers/headerComponentContainer';
import NotificationComponentContainer from '../componentContainers/notificationComponentContainer';
import { ERoleUser } from '../types/stateTypes/userStateType';
import {
  adminAllCheckLists,
  adminAllUsersUrl,
  adminDashboardUrl,
  adminPaymentStatistics,
  baseUrl,
  checkInStatistics,
  checkInUrl,
  checkListUrl,
  dashboardUrl,
  emailConfirm,
  loginUrl,
  logOutUrl,
  notFoundUrl,
  paymentPayPalUrl,
  profileUrl,
  publicCheckListInfoUrl,
  publicCheckListUrl,
  registerUrl,
  resetPassword,
  token,
  tokenError
} from '../constants/routes';
import LoginPage from '../pages/loginPage';
import { AboutComponent } from '../pages/aboutPage';
import PublicGEOCheckListsPage from '../pages/publicGEOCheckListsPage';
import { NotFoundPage } from '../pages/404Page';
import EmailConfirmPage from '../pages/emailConfirmPage';
import TokenPageContainer from '../componentContainers/tokenPageContainer';
import TokenErrorContainer from '../componentContainers/tokenErrorContainer';
import ResetPasswordComponentContainer from '../componentContainers/resetPasswordComponentContainer';
import DashboardPage from '../pages/dashboardPage';
import ProfilePage from '../pages/profilePage';
import ChecklistPage from '../pages/checklistPage';
import CheckinPage from '../pages/checkinPage';
import CheckinStatisticsPage from '../pages/checkinStatisticsPage';
import LogOutComponentContainer from '../componentContainers/logOutComponentContainer';
import AdminDashboardPage from '../pagesAdmin/adminDashboardPage';
import AdminAllUsersPage from '../pagesAdmin/adminAllUsersPage';
import AdminAllChecklistPage from '../pagesAdmin/adminAllChecklistPage';
import { PublicCheckListInfoPage } from '../pages/publicCheckListInfoPage';
import { AdminPaymentStatisticsPage } from '../pagesAdmin/adminPaymentStatisticsPage';
import PaymentPayPalContainer from '../componentContainers/paymentPayPalContainer';
// import routersMap from '../mapForComponents/routersMap';
// import LoginPage from '../pages/loginPage';
// import { AboutComponent } from '../pages/aboutPage';

// export default class Routes extends React.Component<IRoutesComponentProps, any> {
//
//   renderRouters( authorize: boolean, userRole: ERoleUser ) {
//     return routersMap( authorize, userRole ).map(
//       ( item: { path: string, component: ReactNode, exact: boolean }, index: number ) => {
//         const Component: any = item.component;
//         return (
//           <Route
//             key={index}
//             exact={item.exact}
//             // exact={true}
//             path={item.path}
//             component={Component}
//           />
//         );
//       } );
//   }
//
//   render() {
//     const component: any = (
//       <Switch>
//         {this.renderRouters( this.props.authorized, this.props.roleUser )}
//
//         <Redirect from="*" to={notFoundUrl}/>
//       </Switch>
//     );
//     return (
//       <React.Fragment>
//         {this.props.path !== notFoundUrl ?
//           <header>
//             <HeaderComponentContainer/>
//           </header>
//           :
//           <div/>}
//         <main>
//           <NotificationComponentContainer/>
//           {component}
//         </main>
//         <footer>
//           <a href="https://github.com/bugnabuggy/geoping">project on git hub</a>
//         </footer>
//       </React.Fragment>
//     );
//   }
// }

const AdminRoute = ( { isAllowed, userRoles, ...props }: any ) => {
  const userRole: ERoleUser = userRoles.find( ( item: string ) => item === ERoleUser.Admin );
  return isAllowed /*&& !!userRole*/ ?
    <Route {...props}/>
    :
    <Redirect to={dashboardUrl}/>;
};

const ProtectedRoute = ( { isAllowed, ...props }: any ) => isAllowed ?
  <Route {...props}/>
  :
  <Redirect to={loginUrl}/>;

const NotAuthorizeRoute = ( { isAllowed, ...props }: any ) => !isAllowed ?
  <Route {...props}/>
  :
  <Redirect to={dashboardUrl}/>;

export const Routes = ( props: any ) =>
  (
    <React.Fragment>
      <header>
        <HeaderComponentContainer/>
      </header>
      <main>
        <NotificationComponentContainer/>
        <Switch>
          <Route exact={true} path={baseUrl} component={AboutComponent}/>
          <Route exact={true} path={publicCheckListUrl} component={PublicGEOCheckListsPage}/>
          <Route exact={true} path={publicCheckListInfoUrl} component={PublicCheckListInfoPage}/>
          <Route exact={true} path={emailConfirm} component={EmailConfirmPage}/>
          <Route exact={true} path={token} component={TokenPageContainer}/>
          <Route exact={true} path={tokenError} component={TokenErrorContainer}/>
          <Route exact={true} path={notFoundUrl} component={NotFoundPage}/>
          <Route exact={true} path={paymentPayPalUrl} component={PaymentPayPalContainer}/>
          <NotAuthorizeRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={loginUrl}
            component={LoginPage}
          />
          <NotAuthorizeRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={registerUrl}
            component={LoginPage}
          />
          <NotAuthorizeRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={resetPassword}
            component={ResetPasswordComponentContainer}
          />
          <ProtectedRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={dashboardUrl}
            component={DashboardPage}
          />
          <ProtectedRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={profileUrl}
            component={ProfilePage}
          />
          <ProtectedRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={checkListUrl}
            component={ChecklistPage}
          />
          <ProtectedRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={checkInUrl}
            component={CheckinPage}
          />
          <ProtectedRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={checkInStatistics}
            component={CheckinStatisticsPage}
          />
          <ProtectedRoute
            isAllowed={props.isTokenVerified}
            exact={true}
            path={logOutUrl}
            component={LogOutComponentContainer}
          />
          <AdminRoute
            isAllowed={props.isTokenVerified}
            userRoles={props.userRoles}
            exact={true}
            path={adminDashboardUrl}
            component={AdminDashboardPage}
          />
          <AdminRoute
            isAllowed={props.isTokenVerified}
            userRoles={props.userRoles}
            exact={true}
            path={adminAllUsersUrl}
            component={AdminAllUsersPage}
          />
          <AdminRoute
            isAllowed={props.isTokenVerified}
            userRoles={props.userRoles}
            exact={true}
            path={adminAllCheckLists}
            component={AdminAllChecklistPage}
          />
          <AdminRoute
            isAllowed={props.isTokenVerified}
            userRoles={props.userRoles}
            exact={true}
            path={adminPaymentStatistics}
            component={AdminPaymentStatisticsPage}
          />
          <Redirect from="*" to={notFoundUrl}/>
          {/*<Route component={NotFoundPage}/>*/}
        </Switch>
      </main>
      <footer>
        <a href="https://github.com/bugnabuggy/geoping">project on git hub</a>
      </footer>
    </React.Fragment>
  );
