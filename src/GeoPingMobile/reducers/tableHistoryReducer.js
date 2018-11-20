"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tableHistoryState_1 = require("../state/tableHistoryState");
const filters_1 = require("../constantsForReducer/filters");
const historyTable_1 = require("../constantsForReducer/historyTable");
function tableHistoryReducer(state = tableHistoryState_1.tableHistoryState, action) {
    const reduceObject = {
        [filters_1.FILTER_HISTORY_TABLE]: filterHistory,
        [filters_1.CLOSE_FILTER_HISTORY]: closeFilterHistory,
        [historyTable_1.LOAD_LIST_HISTORY]: loadHistory,
        [historyTable_1.SAVE_RECORD_HISTORY]: saveHistory,
        [historyTable_1.TABLE_HISTORY_LOADING]: loadingHistory,
        [historyTable_1.CLEAR_TABLE_HISTORY]: clear,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = tableHistoryReducer;
function loadHistory(state, action) {
    return Object.assign({}, state, { history: action.history });
}
function filterHistory(state, action) {
    const newState = Object.assign({}, state, { showHistoryFilter: action.isShow });
    return newState;
}
function closeFilterHistory(state, action) {
    const newState = Object.assign({}, state, { showHistoryFilter: action.isShow });
    return newState;
}
function saveHistory(state, action) {
    return Object.assign({}, state, { history: [
            ...state.history,
            action.historyData,
        ] });
}
function loadingHistory(state, action) {
    return Object.assign({}, state, { isLoading: action.isLoading });
}
function clear(state, action) {
    return Object.assign({}, tableHistoryState_1.tableHistoryState);
}
