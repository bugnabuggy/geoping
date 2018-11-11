import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckinStatisticsStateType from '../types/stateTypes/checkinStatisticsStateType';
import ICheckListStateType from '../types/stateTypes/checkListStateType';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';

export default interface ICheckinStatisticsComponentContainerProps {
  checkinStatistics: ICheckinStatisticsStateType;
  checkList: ICheckListStateType;
  googleMap: IGoogleMapStateType;
  listId: string;

  loadLists: () => ( dispatch: IDispatchFunction ) => void;
  loadUsers: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( listId: string, userId: string, dateFrom: string, dateTo: string ) =>
    ( dispatch: IDispatchFunction ) => void;
  checkInStatisticsClear: () => ( dispatch: IDispatchFunction ) => void;
  getAllCheckForList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  clearGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
}