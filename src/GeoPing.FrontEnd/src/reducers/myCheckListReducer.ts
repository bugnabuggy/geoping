import { CLOSE_MODAL_SHARE, SHOW_MODAL_SHARE } from '../../GeoPing.FrontEnd/src/constantsForReducer/modal';
import {
  CLEAR_STATE_MY_CHECK_LIST,
  CREATE_CHECK_LIST,
  DELETE_MY_CHECK_LISTS,
  LOAD_MY_CHECK_LISTS,
  MY_CHECK_LIST_LOADING
} from '../../GeoPing.FrontEnd/src/constantsForReducer/checkList';
import { myCheckList } from '../../GeoPing.FrontEnd/src/state/myCheckListState';
import IMyCheckListsStateType from '../../GeoPing.FrontEnd/src/types/stateTypes/myCheckListsStateType';
import { PROVIDE_PUBLIC_ACCESS } from '../../GeoPing.FrontEnd/src/constantsForReducer/sharedCheckList';

export default function myCheckListReducer( state: IMyCheckListsStateType = myCheckList, action: any ) {
  const reduceObject: any = {
    [ SHOW_MODAL_SHARE ]: showModalShare,
    [ CLOSE_MODAL_SHARE ]: closeModalShare,
    [ LOAD_MY_CHECK_LISTS ]: loadMyCheckLists,
    // [ DELETE_MY_CHECK_LISTS ]: deleteMyCheckList,
    [ CLEAR_STATE_MY_CHECK_LIST ]: clearStateMyCheckList,
    [ PROVIDE_PUBLIC_ACCESS ]: providePublicAccess,
    [ MY_CHECK_LIST_LOADING ]: loading,
    [ CREATE_CHECK_LIST ]: createCheckList,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function showModalShare( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    isShowModalShare: !!action.checkListId,
    idCheckListShow: action.checkListId,
  };
}

function closeModalShare( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    isShowModalShare: action.isShow,
    idCheckListShow: '',
  };
}

function loadMyCheckLists( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    checkLists: action.checklists,
  };
}

// function deleteMyCheckList( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
//   return {
//     ...state,
//     checkLists: state.checkLists.filter( ( item: any ) => item.id !== action.checkListId )
//   };
// }

function clearStateMyCheckList( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...myCheckList,
  };
}

function providePublicAccess( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    checkLists: [
      ...state.checkLists.map( ( item: any ) => {
        return item.id === action.idList ?
          {
            ...item,
            public: action.isPublic,
          }
          :
          item;
      } )
    ],
  };
}

function loading( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    isLoading: action.loading,
  };
}

function createCheckList( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    isRedirect: true,
  };
}
