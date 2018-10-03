import IDispatchFunction from '../DTO/types/dispatchFunction';

const LOAD_INFO: string = 'LOAD_INFO';

export const loadProfileData = () => ( dispatch: IDispatchFunction ) => {
 dispatch(loadProfileDataAction);
};

export const changePassword = ( newPassword: string ) => ( dispatch: IDispatchFunction ) => {
  console.log('a');
};

export const upgradeAccount = () => ( dispatch: IDispatchFunction ) => {
  console.log('a');
};
function loadProfileDataAction(): Object {
  return {type: LOAD_INFO};
}