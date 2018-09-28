import ILocationProps from '../locationProps';
import IDispatchFunction from '../../DTO/types/dispatchFunction';
import { ERoleUser } from '../../DTO/types/stateTypes/userStateType';

export default interface IHeaderComponentContainerProps {
  location: ILocationProps;
  routeKey: string;
  userAuthorization: boolean;
  roleUser: ERoleUser;

  editRoute: ( routeKey: string ) => ( dispatch: IDispatchFunction ) => void;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
}