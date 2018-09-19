import ICheckinStatisticsStateType from '../DTO/types/stateTypes/checkinStatisticsStateType';
import { checkinStatisticsState } from '../state/checkinStatisticsState';

export default function checkinStatisticsReducer(
  state: ICheckinStatisticsStateType = checkinStatisticsState,
  action: any,
) {
  const reduceObject: any = {};

  return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
}