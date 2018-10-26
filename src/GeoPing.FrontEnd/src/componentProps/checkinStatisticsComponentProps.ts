import ICheckinStatisticsStateType from '../types/stateTypes/checkinStatisticsStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface ICheckinStatisticsComponentProps {
  checkinStatistics: ICheckinStatisticsStateType;

  loadUsers: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string, idUser: string ) => ( dispatch: IDispatchFunction ) => void;
}