import ILocationProps from '../locationProps';
import IDispatchFunction from '../../DTO/types/dispatchFunction';

export default interface IHeaderComponentContainerProps {
  location: ILocationProps;
  routeKey: string;
  userAuthorization: boolean;

  editRoute: ( routeKey: string ) => ( dispatch: IDispatchFunction ) => void;

  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
}