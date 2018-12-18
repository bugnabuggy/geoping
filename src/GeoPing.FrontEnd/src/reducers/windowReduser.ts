import IWindowStateType from '../types/stateTypes/windowStateType';
import { windowState } from '../state/windowState';
import {
  BLOCKING_WINDOW_DURING_AN_ACTION,
  CONFIRM_EMAIL,
  REDIRECT,
  REDIRECT_ON_SIGN_IN_FORM
} from '../constantsForReducer/window';
import { LOAD_COUTRIES, LOAD_TIME_ZONES } from '../constantsForReducer/utilities';

export default function windowReducer( state: IWindowStateType = windowState, action: any ) {
  const reduceObject: any = {
    [ BLOCKING_WINDOW_DURING_AN_ACTION ]: blockingWindow,
    [ REDIRECT_ON_SIGN_IN_FORM ]: redirectLoginForm,
    [ CONFIRM_EMAIL ]: confirmEmail,
    [ REDIRECT ]: redirect,
    [ LOAD_TIME_ZONES ]: loadTimeZones,
    [ LOAD_COUTRIES ]: loadCountries,
  };
  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function blockingWindow( state: IWindowStateType, action: any ): IWindowStateType {
  return {
    ...state,
    isBlockingWindow: action.isBlocking,
  };
}

function redirectLoginForm( state: IWindowStateType, action: any ): IWindowStateType {
  return {
    ...state,
    redirectOnSignInForm: action.isRedirect,
  };
}

function confirmEmail( state: IWindowStateType, action: any ): IWindowStateType {
  return {
    ...state,
    isConfirmEmail: true,
  };
}

function redirect( state: IWindowStateType, action: any ): IWindowStateType {
  return {
    ...state,
    redirect: action.redirect,
  };
}

function loadTimeZones( state: IWindowStateType, action: any ): IWindowStateType {
  return {
    ...state,
    timeZones: action.timeZones,
  };
}

function loadCountries( state: IWindowStateType, action: any ): IWindowStateType {
  return {
    ...state,
    coutries: action.coutries,
  };
}
