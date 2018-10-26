import { userState } from '../state/userState';
import IUserStateType from '../types/stateTypes/userStateType';
import {
  REDIRECT_DASHBOARD_FOR_LOGIN,
  USER_AUTHORIZATION,
  USER_AUTHORIZATION_TEST_PERIOD,
  USER_SIGN_OUT
} from '../constantsForReducer/user';

export default function userReducer( state: IUserStateType = userState, action: any ) {

  const reduceObject: any = {
    [ USER_AUTHORIZATION ]: userAuthorization,
    [ USER_SIGN_OUT ]: sigOutUser,
    [ USER_AUTHORIZATION_TEST_PERIOD ]: userAuthorizationTestPeriod,
    [ REDIRECT_DASHBOARD_FOR_LOGIN ]: redirect,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function userAuthorization( state: IUserStateType, action: any ) {
  return {
    ...state,
    authorized: action.authorization,
  };
}

function sigOutUser( state: IUserStateType, action: any ) {
  return {
    ...state,
    authorized: false,
  };
}

function userAuthorizationTestPeriod( state: IUserStateType, action: any ) {
  return {
    ...state,
    authorized: action.authorization,
  };
}

function redirect( state: IUserStateType, action: any ) {
  return {
    ...state,
    redirectDashboard: action.isRedirect,
  };
}
