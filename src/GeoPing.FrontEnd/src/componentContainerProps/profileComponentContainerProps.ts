import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IProfileStateType from '../types/stateTypes/profileStateType';
import IWindowStateType from '../types/stateTypes/windowStateType';

export interface IProfileComponentContainerProps {
  profileState: IProfileStateType;
  isShowModal: boolean;
  avatar: string;
  window: IWindowStateType;

  loadProfileData: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  updateProfileData: ( data: any ) => ( dispatch: IDispatchFunction ) => void;
  showModalChangePassword: () => ( dispatch: IDispatchFunction ) => void;
  closeModalChangePassword: () => ( dispatch: IDispatchFunction ) => void;
  changePassword: ( password: string, newPassword: string ) => ( dispatch: IDispatchFunction ) => void;
  // upgradeAccount?: () => (dispatch: IDispatchFunction ) => void;
  saveAvatar: ( avatar: string ) => ( dispatch: IDispatchFunction ) => void;
  getTimeZones: () => ( dispatch: IDispatchFunction ) => void;
  getCountries: () => ( dispatch: IDispatchFunction ) => void;
}
