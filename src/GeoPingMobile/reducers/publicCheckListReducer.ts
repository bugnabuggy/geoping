import IPublicCheckListType from '../types/stateTypes/publicCheckListType';
import { publicCheckListState } from '../state/publickCheckListState';
import {
  PUBLIC_LIST_CHANGE_FILTER,
  PUBLIC_LIST_CHANGE_PAGINATION,
  PUBLIC_LIST_LOAD_LISTS
} from '../constantsForReducer/publicCheckList';

export default function publicCheckListReducer( state: IPublicCheckListType = publicCheckListState, action: any ) {
  const reduceObject: any = {
    [ PUBLIC_LIST_CHANGE_FILTER ]: changeFilter,
    [ PUBLIC_LIST_CHANGE_PAGINATION ]: changePagination,
    [ PUBLIC_LIST_LOAD_LISTS ]: loadLists,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function changeFilter( state: IPublicCheckListType, action: any ) {
  return {
    ...state,
    [ 'filter' + action.filter.nameFilter ]: action.filter.value,
  };
}

function changePagination( state: IPublicCheckListType, action: any ) {
  return {
    ...state,
    pageNumber: action.numberPage,
  };
}

function loadLists( state: IPublicCheckListType, action: any ) {
  return {
    ...state,
    checkLists: action.list,
  };
}