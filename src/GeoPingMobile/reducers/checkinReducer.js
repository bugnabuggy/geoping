"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkinState_1 = require("../state/checkinState");
const checkin_1 = require("../constantsForReducer/checkin");
const googleMap_1 = require("../constantsForReducer/googleMap");
function checkinReducer(state = checkinState_1.checkinState, action) {
    const reduceObject = {
        [checkin_1.CHECK_IN_LOAD_LISTS]: checkinLoadLists,
        [checkin_1.CHECK_IN_SELECT_LIST]: selectList,
        [checkin_1.CHECK_IN_FLAG_CHANGE]: checkinFlag,
        [googleMap_1.ADD_DISTANCE_BETWEEN_POINTS]: addDistanceBetweenPoints,
        [googleMap_1.SELECT_MARKER]: selectMarker,
        [checkin_1.LOADING_CHECK_LISTS]: loadingCheckLIst,
        [checkin_1.LOADING_GEO_POINTS]: loadingGeoPoints,
        [checkin_1.CHECK_IN_CLEAR]: clear,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = checkinReducer;
function checkinLoadLists(state, action) {
    return Object.assign({}, state, { selectList: action.lists });
}
function selectList(state, action) {
    return Object.assign({}, state, { selectedListId: action.idList, difference: null });
}
function checkinFlag(state, action) {
    return Object.assign({}, state, { isCheckIn: action.isCheckin });
}
function addDistanceBetweenPoints(state, action) {
    return Object.assign({}, state, { difference: action.distance });
}
function selectMarker(state, action) {
    if (action.marker.id === '') {
        return Object.assign({}, state, { difference: null });
    }
    return state;
}
function loadingCheckLIst(state, action) {
    return Object.assign({}, state, { isListLoading: action.isLoading });
}
function loadingGeoPoints(state, action) {
    return Object.assign({}, state, { isPointLoading: action.isLoading });
}
function clear(state, action) {
    return Object.assign({}, checkinState_1.checkinState);
}
