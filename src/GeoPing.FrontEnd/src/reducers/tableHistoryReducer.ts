import { ITableHistoryStateType } from '../types/stateTypes/tableHistoryStateType';
import { tableHistoryState } from '../state/tableHistoryState';
import { CLOSE_FILTER_HISTORY, FILTER_HISTORY_TABLE } from '../constantsForReducer/filters';
import { LOAD_LIST_HISTORY, SAVE_RECORD_HISTORY } from '../constantsForReducer/historyTable';

export default function tableHistoryReducer( state: ITableHistoryStateType = tableHistoryState, action: any ) {
  const reduceObject: any = {
    [ FILTER_HISTORY_TABLE ]: filterHistory,
    [ CLOSE_FILTER_HISTORY ]: closeFilterHistory,
    [ LOAD_LIST_HISTORY ]: loadHistory,
    [ SAVE_RECORD_HISTORY ]: saveHistory,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function loadHistory( state: ITableHistoryStateType, action: any ) {
  return {
    ...state,
    history: action.history
  };
}

function filterHistory( state: ITableHistoryStateType, action: any ) {
  const newState: ITableHistoryStateType = Object.assign( {}, state, { showHistoryFilter: action.isShow } );
  return newState;
}

function closeFilterHistory( state: ITableHistoryStateType, action: any ) {
  const newState: ITableHistoryStateType = Object.assign( {}, state, { showHistoryFilter: action.isShow } );
  return newState;
}

function saveHistory( state: ITableHistoryStateType, action: any ): ITableHistoryStateType {
  return {
    ...state,
    history: [
      ...state.history,
      action.historyData,
    ],
  };
}