import IDispatchFunction from '../DTO/types/dispatchFunction';
const LOAD = '../state/profileState';

export const loadProfileData = () => ( dispatch: IDispatchFunction ) => {
  return {type: LOAD};
};

export const changePassword = ( newPassword: string ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const upgradeAccount = () => ( dispatch: IDispatchFunction ) => {
  return '';
};