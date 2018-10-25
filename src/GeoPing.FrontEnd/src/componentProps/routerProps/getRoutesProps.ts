import { ERoleUser } from '../../types/stateTypes/userStateType';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IGetRoutesProps {
  authorized: boolean;
  location: any;
  roleUser: ERoleUser;

  authorizationUserFlag: ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => void;
}