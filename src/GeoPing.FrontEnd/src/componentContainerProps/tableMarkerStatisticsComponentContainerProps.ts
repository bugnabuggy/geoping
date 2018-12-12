import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';
import ICheckinStatisticsStateType from '../types/stateTypes/checkinStatisticsStateType';

export default interface ITableMarkerStatisticsComponentContainerProps {
  googleMap: IGoogleMapStateType;
  checkinStatistics: ICheckinStatisticsStateType;
  listId: string;
  userId: string;
}