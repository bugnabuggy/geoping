"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedCheckListState_1 = require("../state/sharedCheckListState");
const sharedCheckList_1 = require("../constantsForReducer/sharedCheckList");
function sharedCheckListReducer(state = sharedCheckListState_1.sharedCheckList, action) {
    const reduceObject = {
        [sharedCheckList_1.LOAD_USERS_LIST_WITCH_SHARED_ACCESS]: loadUsersWitchSharedAccess,
        [sharedCheckList_1.CLEAR_SHARED_CHECK_LIST]: clear,
        [sharedCheckList_1.SEND_SHARE_CHECK_LIST_FOR_USERS]: sendShare,
        [sharedCheckList_1.LOADING_USERS_WHO_HAS_ACCESS]: loadingUsers,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = sharedCheckListReducer;
function loadUsersWitchSharedAccess(state, action) {
    return Object.assign({}, state, { listUsersWitchAccess: action.usersList });
}
function clear(state, action) {
    return Object.assign({}, sharedCheckListState_1.sharedCheckList);
}
function sendShare(state, action) {
    return Object.assign({}, state, { listUsersWitchAccess: action.users });
}
function loadingUsers(state, action) {
    return Object.assign({}, state, { isLoading: action.isLoading });
}
