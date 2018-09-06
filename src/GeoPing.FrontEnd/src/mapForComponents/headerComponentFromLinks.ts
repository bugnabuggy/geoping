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
        path: '/',
        text: 'Sign out',
        id: '/#'
      }
    ],
  }
];

export const notAuthorizedLinks: Array<any> = [
  {
    path: '/#',
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