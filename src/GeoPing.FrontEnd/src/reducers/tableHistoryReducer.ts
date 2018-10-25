import { ITableHistoryStateType } from '../types/stateTypes/tableHistoryStateType';
import { tableHistoryState } from '../state/tableHistoryState';
import { CLOSE_FILTER_HISTORY, FILTER_HISTORY_TABLE } from '../constantsForReducer/filters';
import {
  CLEAR_TABLE_HISTORY,
  LOAD_LIST_HISTORY,
  SAVE_RECORD_HISTORY,
  TABLE_HISTORY_LOADING
} from '../constantsForReducer/historyTable';

export default function tableHistoryReducer( state: ITableHistoryStateType = tableHistoryState, action: any ) {
  const reduceObject: any = {
    [ FILTER_HISTORY_TABLE ]: filterHistory,
    [ CLOSE_FILTER_HISTORY ]: closeFilterHistory,
    [ LOAD_LIST_HISTORY ]: loadHistory,
    [ SAVE_RECORD_HISTORY ]: saveHistory,
    [ TABLE_HISTORY_LOADING ]: loadingHistory,
    [ CLEAR_TABLE_HISTORY ]: clear,
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

function loadingHistory( state: ITableHistoryStateType, action: any ): ITableHistoryStateType {
  return {
    ...state,
    isLoading: action.isLoading,
  };
}

function clear( state: ITableHistoryStateType, action: any ): ITableHistoryStateType {
  return {
    ...tableHistoryState,
  };
}
