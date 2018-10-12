import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface ITableHistoryDashboardContainerProps {
  show: boolean;
  history: any;

  filterHistory: () => ( dispatch: IDispatchFunction ) => void;
  closeFilterHistory: () => ( dispatch: IDispatchFunction ) => void;
  loadHistory: () => ( dispatch: IDispatchFunction ) => void;
}
