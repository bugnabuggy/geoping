import IUserState, { ERoleUser } from '../DTO/types/stateTypes/userStateType';

export const userState: IUserState = {
  name: '',
  avatar: '',
  authorized: false,
  roleUser: ERoleUser.User,
};