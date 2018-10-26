import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUserState from '../types/stateTypes/userStateType';

export default interface IAboutComponentContainerProps {
  user: IUserState;

  useTestPeriod: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  getVirtualDatabase: () => ( dispatch: IDispatchFunction ) => void;
  redirectDaschboard: ( isRedirect: boolean ) => (dispatch: IDispatchFunction) => void;
}