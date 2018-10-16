import { profileState } from '../state/profileState';
import IProfileStateType from '../types/stateTypes/profileStateType';
import { LOAD_INFO, UPGRADE_ACCOUNT } from '../constantsForReducer/profile';

export default function profileReducer(state: IProfileStateType = profileState, action: any) {
  const reduceObject: any = {
    [LOAD_INFO]: loadProfileData
  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}

function loadProfileData(state: IProfileStateType, action: any) {
  return {
    profileState: action

  };
}