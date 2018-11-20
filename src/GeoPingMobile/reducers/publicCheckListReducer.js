"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const publickCheckListState_1 = require("../state/publickCheckListState");
const publicCheckList_1 = require("../constantsForReducer/publicCheckList");
function publicCheckListReducer(state = publickCheckListState_1.publicCheckListState, action) {
    const reduceObject = {
        [publicCheckList_1.PUBLIC_LIST_CHANGE_FILTER]: changeFilter,
        [publicCheckList_1.PUBLIC_LIST_CHANGE_PAGINATION]: changePagination,
        [publicCheckList_1.PUBLIC_LIST_LOAD_LISTS]: loadLists,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = publicCheckListReducer;
function changeFilter(state, action) {
    return Object.assign({}, state, { ['filter' + action.filter.nameFilter]: action.filter.value });
}
function changePagination(state, action) {
    return Object.assign({}, state, { pageNumber: action.numberPage });
}
function loadLists(state, action) {
    return Object.assign({}, state, { checkLists: action.list });
}
