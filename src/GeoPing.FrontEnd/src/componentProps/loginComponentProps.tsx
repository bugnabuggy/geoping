import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { ERoleUser } from '../types/stateTypes/userStateType';

export default interface ILoginComponentProps {
  path: string;
  userAuthorization: boolean;
  roleUser: ERoleUser;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
  authorizationUserFlag: ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => void;
  redirectDashboard: ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => void;
  windowBlocking: ( isBlocking: boolean ) => ( dispatch: IDispatchFunction ) => void;
}