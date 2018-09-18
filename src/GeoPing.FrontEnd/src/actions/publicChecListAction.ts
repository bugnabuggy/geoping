import IDispatchFunction from '../DTO/types/dispatchFunction';
import {
  PUBLIC_LIST_CHANGE_FILTER,
  PUBLIC_LIST_CHANGE_PAGINATION,
  PUBLIC_LIST_LOAD_LISTS
} from '../DTO/constantsForReducer/publicCheckList';

export const changeFilter = ( nameFilter: string, value: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( changeFilterAction ( { nameFilter, value } ) );
};

export const changePagination = ( numberPage: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( changePaginationAction ( numberPage ) );
};

export const loadLists = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

/* Action */
function changeFilterAction( filter: any ): Object {
  return { type: PUBLIC_LIST_CHANGE_FILTER, filter };
}

function changePaginationAction( numberPage: string ): Object {
  return { type: PUBLIC_LIST_CHANGE_PAGINATION, numberPage };
}

function loadListsAction( list: any ): Object {
  return { type: PUBLIC_LIST_LOAD_LISTS, list };
}