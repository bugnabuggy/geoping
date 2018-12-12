import { push } from 'react-router-redux';

import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { BLOCKING_WINDOW_DURING_AN_ACTION, REDIRECT, REDIRECT_ON_SIGN_IN_FORM } from '../constantsForReducer/window';

export const windowBlocking = ( isBlocking: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( windowBlockingAction( isBlocking ) );
};

export const redirectOnSignInForm = ( redirect: boolean ) => ( dispatch: IDispatchFunction ) => {
  localStorage.removeItem( 'token' );
  dispatch( redirectOnSignInFormAction( redirect ) );
};

export const isRedirect = ( redirect: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( isRedirectAction( redirect ) );
};

export const goTo = ( url: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( push( url ) );
};

/* Actions */

export function windowBlockingAction( isBlocking: boolean ): { type: string, isBlocking: boolean } {
  return { type: BLOCKING_WINDOW_DURING_AN_ACTION, isBlocking };
}

export function redirectOnSignInFormAction( redirect: boolean ): { type: string, redirect: boolean } {
  return { type: REDIRECT_ON_SIGN_IN_FORM, redirect };
}

function isRedirectAction( redirect: string ): { type: string, redirect: string } {
  return { type: REDIRECT, redirect };
}
