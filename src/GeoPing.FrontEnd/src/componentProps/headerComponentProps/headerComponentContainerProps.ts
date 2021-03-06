import ILocationProps from '../locationProps';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';
import { ERoleUser } from '../../types/stateTypes/userStateType';
import IUserState from '../../types/stateTypes/userStateType';

export default interface IHeaderComponentContainerProps {
  location: ILocationProps;
  routeKey: string;
  user: IUserState;

  editRoute: ( routeKey: string ) => ( dispatch: IDispatchFunction ) => void;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
}