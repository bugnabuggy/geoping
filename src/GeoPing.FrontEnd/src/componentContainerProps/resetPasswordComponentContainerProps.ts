import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IResetPasswordComponentContainerProps {
  sendLoginOrEmail: ( loginOrEmail: string ) => ( dispatch: IDispatchFunction ) => void;
  sendNewPassword: ( newPassword: string ) => ( dispatch: IDispatchFunction ) => void;
}