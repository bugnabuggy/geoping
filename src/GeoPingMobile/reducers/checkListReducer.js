"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkListState_1 = require("../state/checkListState");
const checkList_1 = require("../constantsForReducer/checkList");
const filters_1 = require("../constantsForReducer/filters");
const googleMap_1 = require("../constantsForReducer/googleMap");
const modal_1 = require("../constantsForReducer/modal");
const publicCheckList_1 = require("../constantsForReducer/publicCheckList");
function checkListReducer(state = checkListState_1.checkListState, action) {
    const reduceObject = {
        [checkList_1.OPEN_MODAL_FOR_CREATE_CHECK_LIST]: openModalForCreateCheckList,
        [checkList_1.CLOSE_MODAL_FOR_CREATE_CHECK_LIST]: closeModalForCreateCheckList,
        [checkList_1.CREATE_CHECK_LIST]: createCheckList,
        [checkList_1.EDITING_PERMISSION_POINT]: editingPermissionPoint,
        [checkList_1.CHANGE_NAME_CHECK_LIST]: changeNameChecklist,
        [checkList_1.MODAL_PERIOD_OPEN_CLOSE]: modalPeriodOpenClose,
        [filters_1.FILTER_CHECKLIST_LIST]: filterCheckLists,
        [filters_1.CLOSE_FILTER_CHECKLIST]: closeFilterCheckLists,
        [googleMap_1.SAVE_GEO_POINT]: saveGeoPoint,
        [googleMap_1.SELECT_GEO_POINT]: selectGeoPoint,
        [googleMap_1.CANCEL_GEO_POINT]: cancelGeoPoint,
        [checkList_1.ADD_GEO_POINT_FROM_MY_POSITION]: addGeoPointFromMyPosition,
        [checkList_1.LOAD_CHECK_LIST_DATA]: loadCheckListData,
        [checkList_1.CLEAR_STATE_CHECK_LIST]: clearStateCheckList,
        [checkList_1.LOAD_MARKERS_FOR_CHECK_LIST]: loadMarkersForReducer,
        [checkList_1.SELECT_CHECK_LIST]: selectCheckList,
        [checkList_1.LOAD_MY_CHECK_LISTS]: loadCheckLists,
        [checkList_1.DELETE_MY_CHECK_LISTS]: deleteCheckList,
        [checkList_1.UPDATE_CHECK_LIST]: updateCheckList,
        [modal_1.CLOSE_MODAL_SHARE]: clearSelectedGeoList,
        [publicCheckList_1.PUBLIC_LIST_LOAD_LISTS]: loadPublicCheckLists,
        [checkList_1.IS_CHECK_LIST_PAGE]: checkListFlag,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = checkListReducer;
function createCheckList(state, action) {
    return Object.assign({}, state, { selectedGeoList: Object.assign({}, state.selectedGeoList, { id: action.checklist.id, name: action.checklist.name }) });
}
function openModalForCreateCheckList(state, action) {
    return Object.assign({}, state, { isShowModal: action.isShow });
}
function closeModalForCreateCheckList(state, action) {
    return Object.assign({}, state, { isShowModal: action.isClose });
}
function editingPermissionPoint(state, action) {
    return Object.assign({}, state, { isEditing: action.isEditing });
}
function changeNameChecklist(state, action) {
    return Object.assign({}, state, { name: action.nameChecklist });
}
function modalPeriodOpenClose(state, action) {
    return Object.assign({}, state, { isShowModal: action.isState });
}
function filterCheckLists(state, action) {
    return Object.assign({}, state, { showFilterCheckList: action.isShow });
}
function closeFilterCheckLists(state, action) {
    return Object.assign({}, state, { showFilterCheckList: action.isShow });
}
function saveGeoPoint(state, action) {
    return Object.assign({}, state, { isEditing: false });
}
function selectGeoPoint(state, action) {
    return Object.assign({}, state, { isEditing: !!action.geoPoint.id });
}
function cancelGeoPoint(state, action) {
    return Object.assign({}, state, { isEditing: false });
}
function addGeoPointFromMyPosition(state, action) {
    return Object.assign({}, state, { isMyGeoPosition: action.isMyGeoPosition, isEditing: true });
}
function loadCheckListData(state, action) {
    return Object.assign({}, state, { selectedGeoList: Object.assign({}, action.checkList) });
}
function clearStateCheckList(state, action) {
    return Object.assign({}, checkListState_1.checkListState);
}
function loadMarkersForReducer(state, action) {
    return Object.assign({}, state, { isGeoPointLoading: action.isLoading });
}
function selectCheckList(state, action) {
    return Object.assign({}, state, { selectedGeoList: Object.assign({}, action.checkList) });
}
function loadCheckLists(state, action) {
    return Object.assign({}, state, { checkLists: action.checklists });
}
function deleteCheckList(state, action) {
    return Object.assign({}, state, { checkLists: state.checkLists.filter((item) => item.id !== action.checkListId) });
}
function updateCheckList(state, action) {
    return Object.assign({}, state, { selectedGeoList: Object.assign({}, state.selectedGeoList, action.checkList), checkLists: [
            ...state.checkLists.map(item => {
                if (item.id === action.checkList.id) {
                    return Object.assign({}, item, action.checkList);
                }
                else {
                    return item;
                }
            }),
        ] });
}
function clearSelectedGeoList(state, action) {
    return Object.assign({}, state, { selectedGeoList: checkListState_1.checkListState.selectedGeoList });
}
function loadPublicCheckLists(state, action) {
    return Object.assign({}, state, { checkListPublic: action.lists });
}
function checkListFlag(state, action) {
    return Object.assign({}, state, { isCheckList: action.isCheckList });
}
