import { profileState } from '../state/profileState';
import IProfileStateType from '../DTO/types/stateTypes/profileStateType';
const LOAD = '../state/profileState';

export default function profileReducer(state: IProfileStateType = profileState, action: any) {
  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}

export const load = (data: any) => ({type: LOAD, data});