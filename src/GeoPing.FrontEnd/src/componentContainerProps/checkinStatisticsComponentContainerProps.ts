import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckinStatisticsStateType from '../types/stateTypes/checkinStatisticsStateType';

export default interface ICheckinStatisticsComponentContainerProps {
  checkinStatistics: ICheckinStatisticsStateType;

  loadLists: () => ( dispatch: IDispatchFunction ) => void;
  loadUsers: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string, idUser: string ) => ( dispatch: IDispatchFunction ) => void;
}