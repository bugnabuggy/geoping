import IUserState from '../../types/stateTypes/userStateType';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';
import IWindowStateType from '../../types/stateTypes/windowStateType';

export default interface IGetRoutesProps {
  location: any;
  user: IUserState;
  window: IWindowStateType;

  authorizationUserFlag: ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => void;
  redirectDashboard: ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => void;
}