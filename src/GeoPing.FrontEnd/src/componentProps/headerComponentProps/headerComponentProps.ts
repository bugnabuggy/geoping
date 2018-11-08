import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';
import { ERoleUser } from '../../types/stateTypes/userStateType';
import IUserState from '../../types/stateTypes/userStateType';

export default interface IHeaderComponentProps {
  path: string;
  routeKey: string;
  user: IUserState;

  editRouteAction: ( routeKey: string ) => ( dispatch: IDispatchFunction ) => void;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
}