import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IProfileStateType from '../types/stateTypes/profileStateType';

export interface IProfileContainerProps {
  getProfileState: IProfileStateType ;
  loadProfileData?: () => (dispatch: IDispatchFunction ) => void;
  changePassword?: (newPassword: string ) => (dispatch: IDispatchFunction ) => void;
  upgradeAccount?: () => (dispatch: IDispatchFunction ) => void;
}
