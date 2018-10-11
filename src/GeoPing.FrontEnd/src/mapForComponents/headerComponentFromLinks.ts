import {
  adminDashboardUrl,
  baseUrl,
  checkInUrl,
  dashboardUrl,
  loginUrl,
  profileUrl,
  publicCheckListUrl,
  registerUrl
} from '../constants/routes';

export const authorizedLinks: Array<any> = [
  {
    path: dashboardUrl,
    label: 'Dashboard',
  },
  {
    path: checkInUrl,
    label: 'Check in',
  },
  {
    path: baseUrl,
    label: 'About',
  },
  {
    path: '/',
    label: '%UserName%',
    dropdown: true,
    links: [
      {
        path: profileUrl,
        text: 'Profile',
        id: profileUrl
      },
      {
        path: adminDashboardUrl,
        text: 'Admin Dashboard',
        id: adminDashboardUrl,
        isAdmin: true,
      },
      {
        path: '/',
        text: 'Sign out',
        id: '/#'
      }
    ],
  }
];

export const notAuthorizedLinks: Array<any> = [
  {
    path: publicCheckListUrl,
    label: 'Public checklists',
  },
  {
    path: baseUrl,
    label: 'About',
  },
  {
    path: loginUrl,
    label: 'Sign in',
  },
  {
    path: registerUrl,
    label: 'Sign up',
  }
];