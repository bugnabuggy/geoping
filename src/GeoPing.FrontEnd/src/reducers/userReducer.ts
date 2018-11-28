import { userState } from '../state/userState';
import IUserStateType from '../types/stateTypes/userStateType';
import {
  LOAD_USER_NAME,
  REDIRECT_DASHBOARD_FOR_LOGIN,
  USER_AUTHORIZATION,
  USER_AUTHORIZATION_TEST_PERIOD,
  USER_SIGN_OUT
} from '../constantsForReducer/user';
import { SAVE_AVATAR } from '../constantsForReducer/profile';

export default function userReducer( state: IUserStateType = userState, action: any ) {

  const reduceObject: any = {
    [ USER_AUTHORIZATION ]: userAuthorization,
    [ USER_SIGN_OUT ]: sigOutUser,
    [ USER_AUTHORIZATION_TEST_PERIOD ]: userAuthorizationTestPeriod,
    [ REDIRECT_DASHBOARD_FOR_LOGIN ]: redirect,
    [ LOAD_USER_NAME ]: loadUserData,
    [ SAVE_AVATAR ]: saveAvatar,
    [USER_SIGN_OUT]: logOut,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function userAuthorization( state: IUserStateType, action: any ): IUserStateType {
  return {
    ...state,
    authorized: action.authorization,
  };
}

function sigOutUser( state: IUserStateType, action: any ): IUserStateType {
  return {
    ...state,
    authorized: false,
  };
}

function userAuthorizationTestPeriod( state: IUserStateType, action: any ): IUserStateType {
  return {
    ...state,
    authorized: action.authorization,
  };
}

function redirect( state: IUserStateType, action: any ): IUserStateType {
  return {
    ...state,
    redirectDashboard: action.isRedirect,
  };
}

function loadUserData( state: IUserStateType, action: any ): IUserStateType {
  return {
    ...state,
    ...action.userData,
  };
}

function saveAvatar( state: IUserStateType, action: any ): IUserStateType {
  return {
    ...state,
    avatar: action.avatar,
  };
}

function logOut( state: IUserStateType, action: any ): IUserStateType {
  return {
    ...userState,
  };
}
