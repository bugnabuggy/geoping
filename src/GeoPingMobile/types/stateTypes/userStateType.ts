export default interface IUserStateType {
  userName: string;
  avatar: string;
  authorized: boolean;
  roleUser: ERoleUser;
  redirectDashboard: boolean;
}

export enum ERoleUser {
  Admin = 'admin',
  User = 'user'
}