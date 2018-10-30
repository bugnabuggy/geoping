import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { BLOCKING_WINDOW_DURING_AN_ACTION } from '../constantsForReducer/window';

export const windowBlocking = ( isBlocking: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( windowBlockingAction( isBlocking ) );
};

/* Actions */

export function windowBlockingAction( isBlocking: boolean ): { type: string, isBlocking: boolean } {
  return { type: BLOCKING_WINDOW_DURING_AN_ACTION, isBlocking };
}
