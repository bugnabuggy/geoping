import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export interface IModalChangePasswordComponentProps {
  isShowModal: boolean;
  closeModalChangePassword: () => (dispatch: IDispatchFunction ) => void;
  changePassword: (password: string, newPassword: string ) => (dispatch: IDispatchFunction ) => void;
}