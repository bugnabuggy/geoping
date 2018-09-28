export default interface IUserStateType {
  name: string;
  avatar: string;
  authorized: boolean;
  roleUser: ERoleUser;
}

export enum ERoleUser {
  Admin = 'admin',
  User = 'user'
}