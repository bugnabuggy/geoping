import ICheckinStatisticsStateType from '../types/stateTypes/checkinStatisticsStateType';
import { checkinStatisticsState } from '../state/checkinStatisticsState';
import {
  STATISTICS_CLEAR,
  STATISTICS_LOAD_LISTS,
  STATISTICS_LOAD_USERS
} from '../constantsForReducer/checkinStatistics';

export default function checkinStatisticsReducer(
  state: ICheckinStatisticsStateType = checkinStatisticsState,
  action: any,
) {
  const reduceObject: any = {
    [ STATISTICS_LOAD_LISTS ]: loadLists,
    [ STATISTICS_LOAD_USERS ]: loadUsers,
    [ STATISTICS_CLEAR ]: clear,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function loadLists( state: ICheckinStatisticsStateType, action: any ): ICheckinStatisticsStateType {
  return {
    ...state,
    selectList: action.lists,
    isCheckInStatistics: true,
  };
}

function loadUsers( state: ICheckinStatisticsStateType, action: any ): ICheckinStatisticsStateType {
  return {
    ...state,
    selectUser: action.users,
  };
}

function clear( state: ICheckinStatisticsStateType, action: any ): ICheckinStatisticsStateType {
  return {
    ...checkinStatisticsState,
  };
}
