import { userState } from '../state/userState';
import IUserStateType from '../DTO/types/stateTypes/userStateType';

export default function userReducer( state: IUserStateType = userState, action: any ) {

  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}