import { ITableHistoryStateType } from '../DTO/types/stateTypes/tableHistoryStateType';
import { tableHistoryState } from '../state/tsbleHistoryState';

export default function tableHistoryReducer(state: ITableHistoryStateType = tableHistoryState, action: any) {
  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}