import IDispatchFunction from '../../DTO/types/dispatchFunction';
import { ERoleUser } from '../../DTO/types/stateTypes/userStateType';

export default interface IHeaderComponentProps {
  path: string;
  routeKey: string;
  userAuthorization: boolean;
  roleUser: ERoleUser;

  editRouteAction: ( routeKey: string ) => ( dispatch: IDispatchFunction ) => void;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
}