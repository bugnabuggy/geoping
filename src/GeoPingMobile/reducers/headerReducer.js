"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headerState_1 = require("../state/headerState");
const header_1 = require("../constantsForReducer/header");
function headerReducer(state = headerState_1.headerState, action) {
    const reduceObject = {
        [header_1.EDIT_ROUTE_HEADER_LINK]: editKeyRouter,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = headerReducer;
function editKeyRouter(state, action) {
    const newState = Object.assign({}, state, { routeKey: action.routeKey });
    return newState;
}
