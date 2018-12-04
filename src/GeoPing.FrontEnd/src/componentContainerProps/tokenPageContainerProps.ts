import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ISharedCheckListStateType from '../types/stateTypes/sharedCheckListStateType';

export default interface ITokenPageContainerProps {
  match: any;
  userId: string;
  shared: ISharedCheckListStateType;

  verifyToken: ( token: string, userId: string ) => ( dispatch: IDispatchFunction ) => void;
}