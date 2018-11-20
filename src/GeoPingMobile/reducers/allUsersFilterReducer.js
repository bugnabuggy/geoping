"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allUsersFilterState_1 = require("../state/allUsersFilterState");
const allUsers_1 = require("../constantsForReducer/allUsers");
function allUsersFilterReducer(state = allUsersFilterState_1.allUsersFilterState, action) {
    const reduceObject = {
        [allUsers_1.CHANGE_FILTERS_ALL_USERS]: changeFilters,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = allUsersFilterReducer;
function changeFilters(state, action) {
    const newState = Object.assign({}, state, {
        [action.fieldName]: action.value,
    });
    return newState;
}
