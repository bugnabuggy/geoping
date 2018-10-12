import IUserState, { ERoleUser } from '../types/stateTypes/userStateType';

export const userState: IUserState = {
  name: '',
  avatar: '',
  authorized: false,
  roleUser: ERoleUser.User,
};