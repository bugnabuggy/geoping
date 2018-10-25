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
  dashboardUrl,
  loginUrl, logOutUrl,
  profileUrl,
  publicCheckListUrl,
  registerUrl,
  resetPassword
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

export default function routersMap( authorize: boolean, userRole: ERoleUser ) {

  const routes: Array<{ path: string, component: ReactNode }> = [
    {
      path: baseUrl,
      component: AboutComponent,
    },
    {
      path: publicCheckListUrl,
      component: PublicGEOCheckListsPage,
    }
  ];

  if ( !authorize ) {
    routes.push( ...[
      {
        path: loginUrl,
        component: LoginPage,
      },
      {
        path: registerUrl,
        component: LoginPage,
      },
      {
        path: resetPassword,
        component: LoginPage,
      }
    ] );
  } else {
    routes.push( ...[
      {
        path: dashboardUrl,
        component: DashboardPage,
      },
      {
        path: profileUrl,
        component: ProfilePage,
      },
      {
        path: checkListUrl,
        component: ChecklistPage,
      },
      {
        path: checkInUrl,
        component: CheckinPage,
      },
      {
        path: checkInStatistics,
        component: CheckinStatisticsPage,
      },
      {
        path: logOutUrl,
        component: LogOutComponentContainer,
      }
    ] );
    if ( userRole === ERoleUser.Admin ) {
      routes.push( ...[
        {
          path: adminDashboardUrl,
          component: AdminDashboardPage,
        },
        {
          path: adminAllUsersUrl,
          component: AdminAllUsersPage,
        },
        {
          path: adminAllCheckLists,
          component: AdminAllChecklistPage,
        }
      ] );
    }
  }

  return routes;
}