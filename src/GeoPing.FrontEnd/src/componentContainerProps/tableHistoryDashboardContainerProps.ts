import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { ITableHistoryStateType } from '../types/stateTypes/tableHistoryStateType';

export default interface ITableHistoryDashboardContainerProps {
  tableHistory: ITableHistoryStateType;

  filterHistory: () => ( dispatch: IDispatchFunction ) => void;
  closeFilterHistory: () => ( dispatch: IDispatchFunction ) => void;
  loadHistory: () => ( dispatch: IDispatchFunction ) => void;
  clearTableHistory: () => ( dispatch: IDispatchFunction ) => void;
}
