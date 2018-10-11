import { ITableHistoryStateType } from '../types/stateTypes/tableHistoryStateType';
import { tableHistoryState } from '../state/tsbleHistoryState';

export default function tableHistoryReducer( state: ITableHistoryStateType = tableHistoryState, action: any ) {
  const reduceObject: any = {
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