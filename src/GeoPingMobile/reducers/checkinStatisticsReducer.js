"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkinStatisticsState_1 = require("../state/checkinStatisticsState");
const checkinStatistics_1 = require("../constantsForReducer/checkinStatistics");
function checkinStatisticsReducer(state = checkinStatisticsState_1.checkinStatisticsState, action) {
    const reduceObject = {
        [checkinStatistics_1.STATISTICS_LOAD_LISTS]: loadLists,
        [checkinStatistics_1.STATISTICS_LOAD_USERS]: loadUsers,
        [checkinStatistics_1.STATISTICS_CLEAR]: clear,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = checkinStatisticsReducer;
function loadLists(state, action) {
    return Object.assign({}, state, { selectList: action.lists, isCheckInStatistics: true });
}
function loadUsers(state, action) {
    return Object.assign({}, state, { selectUser: action.users });
}
function clear(state, action) {
    return Object.assign({}, checkinStatisticsState_1.checkinStatisticsState);
}
