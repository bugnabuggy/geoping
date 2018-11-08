import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { BLOCKING_WINDOW_DURING_AN_ACTION, REDIRECT_ON_SIGN_IN_FORM } from '../constantsForReducer/window';

export const windowBlocking = ( isBlocking: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( windowBlockingAction( isBlocking ) );
};

export const redirectOnSignInForm = ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => {
  localStorage.removeItem( 'token' );
  dispatch( redirectOnSignInFormAction( isRedirect ) );
};

/* Actions */

export function windowBlockingAction( isBlocking: boolean ): { type: string, isBlocking: boolean } {
  return { type: BLOCKING_WINDOW_DURING_AN_ACTION, isBlocking };
}

export function redirectOnSignInFormAction( isRedirect: boolean ): { type: string, isRedirect: boolean } {
  return { type: REDIRECT_ON_SIGN_IN_FORM, isRedirect };
}
