import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IProfileStateType from '../types/stateTypes/profileStateType';

export interface IProfileComponentContainerProps {
  profileState: IProfileStateType ;
  isShowModal: boolean;
  avatar: string;

  loadProfileData: (idUser: string) => (dispatch: IDispatchFunction ) => void;
  updateProfileData: (data: any) => (dispatch: IDispatchFunction ) => void;
  showModalChangePassword: () => (dispatch: IDispatchFunction ) => void;
  closeModalChangePassword: () => (dispatch: IDispatchFunction ) => void;
  changePassword: (password: string, newPassword: string ) => (dispatch: IDispatchFunction ) => void;
  // upgradeAccount?: () => (dispatch: IDispatchFunction ) => void;
  saveAvatar: ( avatar: string) => (dispatch: IDispatchFunction) => void;
}
