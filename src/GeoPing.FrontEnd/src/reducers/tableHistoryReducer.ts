import { ITableHistoryStateType } from '../types/stateTypes/tableHistoryStateType';
import { tableHistoryState } from '../state/tableHistoryState';
import { FILTER_HISTORY_TABLE, CLOSE_FILTER_HISTORY } from '../constantsForReducer/filters';

export default function tableHistoryReducer( state: ITableHistoryStateType = tableHistoryState, action: any ) {
  const reduceObject: any = {
    [FILTER_HISTORY_TABLE]: filterHistory,
    [CLOSE_FILTER_HISTORY]: closeFilterHistory,
    'HISTORY': loadHistory
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function loadHistory( state: ITableHistoryStateType, action: any ) {
  return {
    ...state,
    history: action.history
  };
}
function filterHistory ( state: ITableHistoryStateType, action: any ) {
  const newState: ITableHistoryStateType = Object.assign ( {}, state, { showHistoryFilter: action.isShow } );
  return newState;
}
function closeFilterHistory ( state: ITableHistoryStateType, action: any ) {
  const newState: ITableHistoryStateType = Object.assign({}, state, {showHistoryFilter: action.isShow});
  return newState;
}