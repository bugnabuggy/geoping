import { CHANGE_EMPLOYEE } from '../DTO/constantsForReducer/allUsers';
import { allUsersTableState } from '../state/allUsersTableState';
import IAllUsersTableStateType from '../DTO/types/stateTypes/allUsersTableStateType';

export default function allUsersTableReducer( state: IAllUsersTableStateType = allUsersTableState, action: any ) {
  const reduceObject: any = {
    [CHANGE_EMPLOYEE]: changeEmployee,
  };

  return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
}

function changeEmployee( state: IAllUsersTableStateType, action: any ) {
  const newState: IAllUsersTableStateType = Object.assign ( {}, state, {
    listUsers: [
      ...state.listUsers.map ( ( item ) => {
        return item.id === action.idRow ? { ...item, employee: action.value } : item;
      } )
    ],
  } );
  return newState;
}