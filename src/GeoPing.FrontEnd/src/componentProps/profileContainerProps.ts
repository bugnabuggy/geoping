import IDispatchFunction from '../DTO/types/dispatchFunction';
import IProfileStateType from '../DTO/types/stateTypes/profileStateType';

export interface IProfileContainerProps {
  getProfileState: IProfileStateType ;
  loadProfileData?: () => (dispatch: IDispatchFunction ) => void;
  changePassword?: (newPassword: string ) => (dispatch: IDispatchFunction ) => void;
  upgradeAccount?: () => (dispatch: IDispatchFunction ) => void;
}
