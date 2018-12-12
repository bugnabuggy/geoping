import { IGoogleMapStateType } from '../../types/stateTypes/googleMapStateType';
import ICheckinStatisticsStateType from '../../types/stateTypes/checkinStatisticsStateType';

export default interface ITableMarkerStatisticsComponentProps {
  googleMap: IGoogleMapStateType;
  checkinStatistics: ICheckinStatisticsStateType;
  listId: string;
  userId: string;
}