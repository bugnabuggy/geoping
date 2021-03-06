import { ReactNode } from 'react';

import { ERoleUser } from '../types/stateTypes/userStateType';
import {
  adminAllCheckLists,
  adminAllUsersUrl,
  adminDashboardUrl,
  baseUrl,
  checkInStatistics,
  checkInUrl,
  checkListUrl,
  dashboardUrl, emailConfirm,
  loginUrl,
  logOutUrl,
  notFoundUrl,
  profileUrl,
  publicCheckListUrl,
  registerUrl,
  resetPassword,
  token,
  tokenError
} from '../constants/routes';
import { AboutComponent } from '../pages/aboutPage';
import PublicGEOCheckListsPage from '../pages/publicGEOCheckListsPage';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import ProfilePage from '../pages/profilePage';
import ChecklistPage from '../pages/checklistPage';
import CheckinPage from '../pages/checkinPage';
import CheckinStatisticsPage from '../pages/checkinStatisticsPage';
import AdminDashboardPage from '../pagesAdmin/adminDashboardPage';
import AdminAllUsersPage from '../pagesAdmin/adminAllUsersPage';
import AdminAllChecklistPage from '../pagesAdmin/adminAllChecklistPage';
import LogOutComponentContainer from '../componentContainers/logOutComponentContainer';
import { NotFoundPage } from '../pages/404Page';
import EmailConfirmPage from '../pages/emailConfirmPage';
import ResetPasswordComponentContainer from '../componentContainers/resetPasswordComponentContainer';
import TokenPageContainer from '../componentContainers/tokenPageContainer';
import TokenErrorContainer from '../componentContainers/tokenErrorContainer';

export default function routersMap( authorize: boolean, userRole: ERoleUser ) {

  const routes: Array<{ path: string | RegExp, component: ReactNode, exact: boolean }> = [
    {
      path: baseUrl,
      component: AboutComponent,
      exact: true,
    },
    {
      path: publicCheckListUrl,
      component: PublicGEOCheckListsPage,
      exact: true,
    },
    {
      path: notFoundUrl,
      component: NotFoundPage,
      exact: false,
    },
    {
      path: emailConfirm,
      component: EmailConfirmPage,
      exact: true,
    },
    {
      path: token,
      component: TokenPageContainer,
      exact: false,
    },
    {
      path: tokenError,
      component: TokenErrorContainer,
      exact: false,
    }
  ];

  if ( !authorize ) {
    routes.push( ...[
      {
        path: loginUrl,
        component: LoginPage,
        exact: true,
      },
      {
        path: registerUrl,
        component: LoginPage,
        exact: true,
      },
      {
        path: resetPassword,
        component: ResetPasswordComponentContainer,
        exact: true,
      }
    ] );
  } else {
    routes.push( ...[
      {
        path: dashboardUrl,
        component: DashboardPage,
        exact: false,
      },
      {
        path: profileUrl,
        component: ProfilePage,
        exact: false,
      },
      {
        path: checkListUrl,
        component: ChecklistPage,
        exact: true,
      },
      {
        path: checkInUrl,
        component: CheckinPage,
        exact: false,
      },
      {
        path: checkInStatistics,
        component: CheckinStatisticsPage,
        exact: false,
      },
      {
        path: logOutUrl,
        component: LogOutComponentContainer,
        exact: false,
      }
    ] );
    if ( userRole === ERoleUser.Admin ) {
      routes.push( ...[
        {
          path: adminDashboardUrl,
          component: AdminDashboardPage,
          exact: false,
        },
        {
          path: adminAllUsersUrl,
          component: AdminAllUsersPage,
          exact: false,
        },
        {
          path: adminAllCheckLists,
          component: AdminAllChecklistPage,
          exact: false,
        }
      ] );
    }
  }

  return routes;
}