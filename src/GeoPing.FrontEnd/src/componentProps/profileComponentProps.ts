import IProfileStateType from '../types/stateTypes/profileStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export  interface IProfileComponentProps {
  profileState: IProfileStateType ;

  loadProfileData: () => (dispatch: IDispatchFunction ) => void;
  changePassword: (password: string, newPassword: string ) => (dispatch: IDispatchFunction ) => void;
  upgradeAccount?: () => (dispatch: IDispatchFunction ) => void;
}