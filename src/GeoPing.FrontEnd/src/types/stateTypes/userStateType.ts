export default interface IUserStateType {
  name: string;
  avatar: string;
  authorized: boolean;
  roleUser: ERoleUser;
  redirectDashboard: boolean;
}

export enum ERoleUser {
  Admin = 'admin',
  User = 'user'
}