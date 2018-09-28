export const authorizedLinks: Array<any> = [
  {
    path: '/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/checkin',
    label: 'Check in',
  },
  {
    path: '/',
    label: 'About',
  },
  {
    path: '/',
    label: '%UserName%',
    dropdown: true,
    links: [
      {
        path: '/profile',
        text: 'Profile',
        id: '/profile'
      },
      {
        path: '/admin/dashboard',
        text: 'Admin Dashboard',
        id: '/admin/dashboard',
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
    path: '/publicchecklist',
    label: 'Public checklists',
  },
  {
    path: '/',
    label: 'About',
  },
  {
    path: '/login',
    label: 'Sign in',
  },
  {
    path: '/register',
    label: 'Sign up',
  }
];