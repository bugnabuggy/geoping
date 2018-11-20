"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allUsers_1 = require("../constantsForReducer/allUsers");
const allUsersTableState_1 = require("../state/allUsersTableState");
function allUsersTableReducer(state = allUsersTableState_1.allUsersTableState, action) {
    const reduceObject = {
        [allUsers_1.CHANGE_EMPLOYEE]: changeEmployee,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = allUsersTableReducer;
function changeEmployee(state, action) {
    const newState = Object.assign({}, state, {
        listUsers: [
            ...state.listUsers.map((item) => {
                return item.id === action.idRow ? Object.assign({}, item, { employee: action.value }) : item;
            })
        ],
    });
    return newState;
}
