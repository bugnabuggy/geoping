import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUserStateType from '../types/stateTypes/userStateType';

export default interface ILogOutComponentContainerProps {
  user: IUserStateType;

  signOutUser: () => ( dispatch: IDispatchFunction ) => void;
}