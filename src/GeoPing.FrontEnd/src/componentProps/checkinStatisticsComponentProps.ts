import ICheckinStatisticsStateType from '../types/stateTypes/checkinStatisticsStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckListStateType from '../types/stateTypes/checkListStateType';

export default interface ICheckinStatisticsComponentProps {
  checkinStatistics: ICheckinStatisticsStateType;
  checkList: ICheckListStateType;
  listId: string;

  loadUsers: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( listId: string, userId: string, dateFrom: string, dateTo: string ) =>
    ( dispatch: IDispatchFunction ) => void;
  getAllCheckForList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
}