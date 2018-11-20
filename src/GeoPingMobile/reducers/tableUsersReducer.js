"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tableUserState_1 = require("../state/tableUserState");
function tableUserReducer(state = tableUserState_1.tableUserState, action) {
    const reduceObject = {};
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = tableUserReducer;
