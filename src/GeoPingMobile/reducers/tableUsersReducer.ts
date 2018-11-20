import { tableUserState } from '../state/tableUserState';
import ITableDataStateType from '../types/stateTypes/tableDataStateType';

export default function tableUserReducer(state: ITableDataStateType = tableUserState, action: any) {
  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}