import { userState } from '../state/userState';
import IUserStateType from '../DTO/types/stateTypes/userStateType';
import { USER_AUTHORIZATION, USER_SIGN_OUT } from '../DTO/constantsForReducer/user';
import { post, get } from  '../services/httpService';

export default function userReducer( state: IUserStateType = userState, action: any ) {

  const reduceObject: any = {
    [USER_AUTHORIZATION]: userAuthorization,
    [USER_SIGN_OUT]: sigOutUser
  };

  return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
}

function userAuthorization( state: IUserStateType, action: any ) {
  console.log('a');
  const newState: IUserStateType = Object.assign ( {}, state, { authorized: action.authorization } );
  return newState;
}

function sigOutUser( state: IUserStateType, action: any ) {
  const newState: IUserStateType = Object.assign ( {}, state, { authorized: false } );
  return newState;
}