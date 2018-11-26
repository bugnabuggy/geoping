import { allUsersFilterState } from '../state/allUsersFilterState';
import IAllUsersFilterStateType from '../types/stateTypes/allUsersFilterStateType';
import { CHANGE_FILTERS_ALL_USERS } from '../constantsForReducer/allUsers';

export default function allUsersFilterReducer( state: IAllUsersFilterStateType = allUsersFilterState, action: any ) {
  const reduceObject: any = {
    [CHANGE_FILTERS_ALL_USERS]: changeFilters,
  };

  return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
}

function changeFilters( state: IAllUsersFilterStateType, action: any ) {
  const newState: IAllUsersFilterStateType = Object.assign ( {}, state, {
    [action.fieldName]: action.value,
  } );
  return newState;
}