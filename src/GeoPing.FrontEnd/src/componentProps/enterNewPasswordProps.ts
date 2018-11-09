import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IEnterNewPasswordProps {
  sendNewPassword: ( newPassword: string ) => ( dispatch: IDispatchFunction ) => void;
}