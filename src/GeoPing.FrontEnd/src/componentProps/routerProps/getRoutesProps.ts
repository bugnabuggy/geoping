import IUserState from '../../types/stateTypes/userStateType';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IGetRoutesProps {
  location: any;
  user: IUserState;

  authorizationUserFlag: ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => void;
  redirectDaschboard: ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => void;
}