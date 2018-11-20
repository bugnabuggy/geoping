"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allChecklistFilterState_1 = require("../state/allChecklistFilterState");
const allChecklist_1 = require("../constantsForReducer/allChecklist");
function allChecklistFilterReducer(state = allChecklistFilterState_1.allChecklistFilterState, action) {
    const reduceObject = {
        [allChecklist_1.ALL_CHECKLIST_FILTER_CHANGE]: allChecklistFilterChange
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = allChecklistFilterReducer;
function allChecklistFilterChange(state, action) {
    const newState = Object.assign({}, state, {
        [action.field]: action.value,
    });
    return newState;
}
