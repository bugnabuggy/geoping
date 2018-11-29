import IUserState, { ERoleUser } from '../types/stateTypes/userStateType';

export const userState: IUserState = {
  userName: '',
  avatar: '',
  authorized: false,
  roleUser: ERoleUser.User,
  redirectDashboard: false,
  userId: '',
};