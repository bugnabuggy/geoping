import { ITableHistoryStateType } from '../DTO/types/stateTypes/tableHistoryStateType';
import { tableHistoryState } from '../state/tableHistoryState';
import { FILTER_HISTORY_TABLE, CLOSE_FILTER_HISTORY } from '../DTO/constantsForReducer/filters';

export default function tableHistoryReducer(state: ITableHistoryStateType = tableHistoryState, action: any) {
  const reduceObject: any = {
    [FILTER_HISTORY_TABLE]: filterHistory,
    [CLOSE_FILTER_HISTORY]: closeFilterHistory
  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}

function filterHistory ( state: ITableHistoryStateType, action: any ) {
  const newState: ITableHistoryStateType = Object.assign ( {}, state, { showHistoryFilter: action.isShow } );
  return newState;
}
function closeFilterHistory ( state: ITableHistoryStateType, action: any ) {
  const newState: ITableHistoryStateType = Object.assign ( {}, state, { showHistoryFilter: action.isShow } );
  return newState;
}