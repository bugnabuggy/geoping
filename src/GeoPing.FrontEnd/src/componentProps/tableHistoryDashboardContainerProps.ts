import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ITableHistoryDashboardContainerProps {
  history: any;

  loadHistory: () => ( dispatch: IDispatchFunction ) => void;
}
