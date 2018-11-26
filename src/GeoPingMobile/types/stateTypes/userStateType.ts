export default interface IUserStateType {
  userName: string;
  avatar: string;
  authorized: boolean;
  roleUser: ERoleUser;
  redirectDashboard: boolean;
  token: string;
}

export enum ERoleUser {
  Admin = 'admin',
  User = 'user'
}