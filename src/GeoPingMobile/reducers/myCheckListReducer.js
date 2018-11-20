"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = require("../constantsForReducer/modal");
const checkList_1 = require("../constantsForReducer/checkList");
const myCheckListState_1 = require("../state/myCheckListState");
const sharedCheckList_1 = require("../constantsForReducer/sharedCheckList");
function myCheckListReducer(state = myCheckListState_1.myCheckList, action) {
    const reduceObject = {
        [modal_1.SHOW_MODAL_SHARE]: showModalShare,
        [modal_1.CLOSE_MODAL_SHARE]: closeModalShare,
        [checkList_1.LOAD_MY_CHECK_LISTS]: loadMyCheckLists,
        // [ DELETE_MY_CHECK_LISTS ]: deleteMyCheckList,
        [checkList_1.CLEAR_STATE_MY_CHECK_LIST]: clearStateMyCheckList,
        [sharedCheckList_1.PROVIDE_PUBLIC_ACCESS]: providePublicAccess,
        [checkList_1.MY_CHECK_LIST_LOADING]: loading,
        [checkList_1.CREATE_CHECK_LIST]: createCheckList,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = myCheckListReducer;
function showModalShare(state, action) {
    return Object.assign({}, state, { isShowModalShare: !!action.checkListId, idCheckListShow: action.checkListId });
}
function closeModalShare(state, action) {
    return Object.assign({}, state, { isShowModalShare: action.isShow, idCheckListShow: '' });
}
function loadMyCheckLists(state, action) {
    return Object.assign({}, state, { checkLists: action.checklists });
}
// function deleteMyCheckList( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
//   return {
//     ...state,
//     checkLists: state.checkLists.filter( ( item: any ) => item.id !== action.checkListId )
//   };
// }
function clearStateMyCheckList(state, action) {
    return Object.assign({}, myCheckListState_1.myCheckList);
}
function providePublicAccess(state, action) {
    return Object.assign({}, state, { checkLists: [
            ...state.checkLists.map((item) => {
                return item.id === action.idList ? Object.assign({}, item, { public: action.isPublic }) :
                    item;
            })
        ] });
}
function loading(state, action) {
    return Object.assign({}, state, { isLoading: action.loading });
}
function createCheckList(state, action) {
    return Object.assign({}, state, { isRedirect: true });
}
