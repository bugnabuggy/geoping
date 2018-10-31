import IWindowStateType from '../types/stateTypes/windowStateType';
import { windowState } from '../state/windowState';
import { BLOCKING_WINDOW_DURING_AN_ACTION } from '../constantsForReducer/window';

export default function windowReducer( state: IWindowStateType = windowState, action: any ) {
  const reduceObject: any = {
    [ BLOCKING_WINDOW_DURING_AN_ACTION ]: blockingWindow,
  };
  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function blockingWindow( state: IWindowStateType, action: any ): IWindowStateType {
  return {
    ...state,
    isBlockingWindow: action.isBlocking,
  };
}
