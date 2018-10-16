import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IProfileStateType from '../types/stateTypes/profileStateType';

export interface IProfileComponentContainerProps {
  profileState: IProfileStateType ;
  loadProfileData: () => (dispatch: IDispatchFunction ) => void;
  changePassword: (password: string, newPassword: string ) => (dispatch: IDispatchFunction ) => void;
  // upgradeAccount?: () => (dispatch: IDispatchFunction ) => void;
}
