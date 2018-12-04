import IWindowStateType from '../types/stateTypes/windowStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUserState from '../types/stateTypes/userStateType';

export default interface IEmailConfirmPageProps {
  window: IWindowStateType;
  match: any;
  location: any;
  user: IUserState;

  confirmEmail: ( userId: string, token: string ) => ( dispatch: IDispatchFunction) => void;
  isRedirect: ( redirect: string ) => ( dispatch: IDispatchFunction ) => void;
}