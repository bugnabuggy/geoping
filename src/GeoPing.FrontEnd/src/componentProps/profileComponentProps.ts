import IProfileStateType from '../types/stateTypes/profileStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export  interface IProfileComponentProps {
  profileState: IProfileStateType;
  isShowModal: boolean;

  loadProfileData: (idUser: string) => (dispatch: IDispatchFunction ) => void;
  updateProfileData: (data: any) => (dispatch: IDispatchFunction ) => void;
  showModalChangePassword: () => (dispatch: IDispatchFunction ) => void;
  closeModalChangePassword: () => (dispatch: IDispatchFunction ) => void;
  changePassword: (password: string, newPassword: string ) => (dispatch: IDispatchFunction ) => void;
  upgradeAccount?: () => (dispatch: IDispatchFunction ) => void;
  saveAvatar: ( ) => void;
}