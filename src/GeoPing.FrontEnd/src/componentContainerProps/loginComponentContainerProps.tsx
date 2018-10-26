import ILocationProps from '../componentProps/locationProps';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { ERoleUser } from '../types/stateTypes/userStateType';
import { redirectDaschboard } from '../actions/userAction';

export default interface ILoginComponentContainerProps {
  location: ILocationProps;
 // routeKey: string;
  userAuthorization: boolean;
  roleUser: ERoleUser;

 // editRoute: ( routeKey: string ) => ( dispatch: IDispatchFunction ) => void;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
  authorizationUserFlag: ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => void;
  redirectDaschboard: ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => void;
}