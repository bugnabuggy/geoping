import ICheckinStatisticsStateType from '../DTO/types/stateTypes/checkinStatisticsStateType';
import { checkinStatisticsState } from '../state/checkinStatisticsState';
import { STATISTICS_LOAD_LISTS, STATISTICS_LOAD_USERS } from '../constantsForReducer/checkinStatistics';

export default function checkinStatisticsReducer(
  state: ICheckinStatisticsStateType = checkinStatisticsState,
  action: any,
) {
  const reduceObject: any = {
    [ STATISTICS_LOAD_LISTS ]: loadLists,
    [ STATISTICS_LOAD_USERS ]: loadUsers,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function loadLists( state: ICheckinStatisticsStateType, action: any ) {
  return {
    ...state,
    selectList: action.lists,
  };
}

function loadUsers( state: ICheckinStatisticsStateType, action: any ) {
  return {
    ...state,
    selectUser: action.users,
  };
}