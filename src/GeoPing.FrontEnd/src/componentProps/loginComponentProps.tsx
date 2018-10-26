import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { ERoleUser } from '../types/stateTypes/userStateType';

export default interface ILoginComponentProps {
  // routeKey: string;
  path: string;
  userAuthorization: boolean;
  roleUser: ERoleUser;

  // editRoute: ( routeKey: string ) => ( dispatch: IDispatchFunction ) => void;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
  authorizationUserFlag: ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => void;
  redirectDaschboard: ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => void;
}