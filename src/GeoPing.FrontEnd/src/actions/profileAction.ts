import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

const LOAD_INFO: string = 'LOAD_INFO';

export const loadProfileData = () => ( dispatch: IDispatchFunction ) => {
 dispatch(loadProfileDataAction);
};

export const changePassword = ( newPassword: string ) => ( dispatch: IDispatchFunction ) => {
  const co: any = 'a';
};

export const upgradeAccount = () => ( dispatch: IDispatchFunction ) => {
  const co: any = 'a';
};
function loadProfileDataAction(): Object {
  return {type: LOAD_INFO};
}