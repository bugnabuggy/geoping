import ICheckinStatisticsStateType from '../types/stateTypes/checkinStatisticsStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckListStateType from '../types/stateTypes/checkListStateType';

export default interface ICheckinStatisticsComponentProps {
  checkinStatistics: ICheckinStatisticsStateType;
  checkList: ICheckListStateType;
  listId: string;
  userId: string;

  loadUsers: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( listId: string, data: any ) => ( dispatch: IDispatchFunction ) => void;
  getAllCheckForList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  clearGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
  getFreeChecksInStatisticsByFilter: ( dateFrom: string, dateTo: string ) => ( dispatch: IDispatchFunction ) => void;
  clearStatistic: () => ( dispatch: IDispatchFunction ) => void;
  goTo: ( url: string ) => ( dispatch: IDispatchFunction ) => void;
}