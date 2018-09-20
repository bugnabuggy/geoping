import IPublicCheckListType from '../DTO/types/stateTypes/publicCheckListType';
import { publicCheckListState } from '../state/publickCheckListState';
import {
  PUBLIC_LIST_CHANGE_FILTER,
  PUBLIC_LIST_CHANGE_PAGINATION,
  PUBLIC_LIST_LOAD_LISTS
} from '../DTO/constantsForReducer/publicCheckList';

export default function publicCheckListReducer( state: IPublicCheckListType = publicCheckListState, action: any ) {
  const reduceObject: any = {
    [PUBLIC_LIST_CHANGE_FILTER]: changeFilter,
    [PUBLIC_LIST_CHANGE_PAGINATION]: changePagination,
    [PUBLIC_LIST_LOAD_LISTS]: loadLists,
  };

  return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
}

function changeFilter( state: IPublicCheckListType, action: any ) {
  const newState: IPublicCheckListType = Object.assign ( {}, state, {
    ['filter' + action.filter.nameFilter]: action.filter.value,
  } );
  return newState;
}

function changePagination( state: IPublicCheckListType, action: any ) {
  const newState: IPublicCheckListType = Object.assign ( {}, state, { pageNumber: action.numberPage } );
  return newState;
}

function loadLists(state: IPublicCheckListType, action: any) {
  const newState: IPublicCheckListType = Object.assign({}, state, { checkLists: action.list});
  return newState;
}