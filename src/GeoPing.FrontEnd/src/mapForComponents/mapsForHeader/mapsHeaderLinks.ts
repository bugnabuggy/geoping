export const mapLinksAuthorizedUser: any = [
  {
    text: 'Dashboard',
    path: '/dashboard',
    avatar: false,
  },
  {
    text: 'Check in',
    path: '/checkin',
    avatar: false,
  },
  {
    text: 'About',
    path: '/',
    avatar: false,
  },
  {
    text: '%UserName%',
    path: '/profile',
    avatar: true,
  }
];

export const login: any = {
  text: 'Login',
  path: '/login',
  avatar: false,
};

export const register: any = {
  text: 'Register',
  path: '/register',
  avatar: false,
};

export const about: any = {
  text: 'About',
  path: '/',
  avatar: false,
};

export const mapLinksNotAuthorizedUser: any = {
  '/': [
    { ...login },
    { ...register },
  ],
  '/login': [
    { ...about },
    { ...register },
  ],
  '/register': [
    { ...about },
    { ...login },
  ],
};