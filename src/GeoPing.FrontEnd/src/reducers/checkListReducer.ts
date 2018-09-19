import ICheckListStateType from '../DTO/types/stateTypes/checkListStateType';
import { checkListState } from '../state/checkListState';

export default function checkListReducer(state: ICheckListStateType = checkListState, action: any) {
  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}