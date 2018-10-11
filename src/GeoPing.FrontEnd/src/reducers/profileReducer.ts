import { profileState } from '../state/profileState';
import IProfileStateType from '../types/stateTypes/profileStateType';

export default function profileReducer(state: IProfileStateType = profileState, action: any) {
  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}