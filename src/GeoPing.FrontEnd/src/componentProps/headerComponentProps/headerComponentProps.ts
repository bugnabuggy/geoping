import IDispatchFunction from '../../DTO/types/dispatchFunction';

export default interface IHeaderComponentProps {
  path: string;
  routeKey: string;
  userAuthorization: boolean;

  editRouteAction: ( routeKey: string ) => ( dispatch: IDispatchFunction ) => void;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
}