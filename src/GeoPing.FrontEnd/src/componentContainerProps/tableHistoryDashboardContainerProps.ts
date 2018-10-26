import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { ITableHistoryStateType } from '../types/stateTypes/tableHistoryStateType';
import IUserState from '../types/stateTypes/userStateType';

export default interface ITableHistoryDashboardContainerProps {
  tableHistory: ITableHistoryStateType;
  user: IUserState;

  filterHistory: () => ( dispatch: IDispatchFunction ) => void;
  closeFilterHistory: () => ( dispatch: IDispatchFunction ) => void;
  loadHistory: () => ( dispatch: IDispatchFunction ) => void;
  clearTableHistory: () => ( dispatch: IDispatchFunction ) => void;
  redirectDaschboard: ( isRedirect: boolean ) => (dispatch: IDispatchFunction) => void;
}
