import ICheckinStatisticsStateType from '../DTO/types/stateTypes/checkinStatisticsStateType';
import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ICheckinStatisticsComponentProps {
  checkinStatistics: ICheckinStatisticsStateType;

  loadUsers: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string, idUser: string ) => ( dispatch: IDispatchFunction ) => void;
}