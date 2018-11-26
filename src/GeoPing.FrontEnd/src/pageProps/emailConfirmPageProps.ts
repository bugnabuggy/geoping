import IWindowStateType from '../types/stateTypes/windowStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IEmailConfirmPageProps {
  window: IWindowStateType;
  match: any;
  confirmEmail: ( userId: string, token: string ) => ( dispatch: IDispatchFunction) => void;
}