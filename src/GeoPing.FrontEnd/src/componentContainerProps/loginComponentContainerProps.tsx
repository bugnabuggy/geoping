import ILocationProps from '../componentProps/locationProps';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface ILoginComponentContainerProps {
  location: ILocationProps;
  userAuthorization: boolean;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
  authorizationUserFlag: ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => void;
  redirectDashboard: ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => void;
  windowBlocking: ( isBlocking: boolean ) => ( dispatch: IDispatchFunction ) => void;
  redirectOnSignInForm: ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => void;
}