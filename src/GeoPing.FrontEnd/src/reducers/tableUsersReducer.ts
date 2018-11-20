import { tableUserState } from '../../GeoPing.FrontEnd/src/state/tableUserState';
import ITableDataStateType from '../../GeoPing.FrontEnd/src/types/stateTypes/tableDataStateType';

export default function tableUserReducer(state: ITableDataStateType = tableUserState, action: any) {
  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}