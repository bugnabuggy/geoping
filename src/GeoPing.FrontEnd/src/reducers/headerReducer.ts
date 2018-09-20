import { headerState } from '../state/headerState';
import IHeaderStateType from '../DTO/types/stateTypes/headerStateType';
import { EDIT_ROUTE_HEADER_LINK } from '../DTO/constantsForReducer/header';

export default function headerReducer( state: IHeaderStateType = headerState, action: any ) {
  const reduceObject: any = {
    [EDIT_ROUTE_HEADER_LINK]: editKeyRouter,
  };

  return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
}

function editKeyRouter( state: IHeaderStateType, action: any ) {
  const newState: IHeaderStateType = Object.assign ( {}, state, { routeKey: action.routeKey } );
  return newState;
}