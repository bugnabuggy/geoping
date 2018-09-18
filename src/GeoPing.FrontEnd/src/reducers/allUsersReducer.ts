import { allUsersState } from '../state/allUsersState';
import IAllUsersStateType from '../DTO/types/stateTypes/allUsersStateType';

export default function allUsersReducer(state: IAllUsersStateType = allUsersState, action: any) {
  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}