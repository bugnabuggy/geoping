import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface ITableHistoryDashboardContainerProps {
  history: any;

  loadHistory: () => ( dispatch: IDispatchFunction ) => void;
}
