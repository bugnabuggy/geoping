import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IResetPasswordComponentContainerProps {
  match: any;
  location: any;
  sendLoginOrEmail: ( loginOrEmail: string ) => ( dispatch: IDispatchFunction ) => void;
  sendNewPassword: ( userId: string, token: string, newPassword: string ) => ( dispatch: IDispatchFunction ) => void;
}