export default interface IUserStateType {
  userName: string;
  avatar: string;
  authorized: boolean;
  roles: Array<ERoleUser>;
  redirectDashboard: boolean;
  userId: string;
}

export enum ERoleUser {
  Admin = 'admin',
  User = 'user'
}