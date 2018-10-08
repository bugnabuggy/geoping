import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ITableHistoryDashboardContainerProps {
  show: boolean;

  filterHistory: () => ( dispatch: IDispatchFunction ) => void;
  closeFilterHistory: () => ( dispatch: IDispatchFunction ) => void;
}
