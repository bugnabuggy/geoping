"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkList_1 = require("../constantsForReducer/checkList");
const modal_1 = require("../constantsForReducer/modal");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
exports.loadCheckLists = () => (dispatch) => {
    dispatch(loadingAction(true));
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.loadAllMyCheckLists()
        .then((checkLists) => {
        dispatch(loadCheckListsAction(checkLists));
        dispatch(loadingAction(false));
    })
        .catch((error) => {
        console.log('err', error.response);
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        dispatch(loadingAction(false));
    });
};
exports.deleteCheckList = (idCheckList) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.deleteMyCheckList(idCheckList)
        .then((checkLists) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Geolist was successfully removed', notificationTypeEnum_1.EnumNotificationType.Success)));
        dispatch(deleteCheckListAction(idCheckList));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.showModalShare = (checkListId) => (dispatch) => {
    dispatch(showModalShareAction(checkListId));
};
exports.closeModalShare = () => (dispatch) => {
    dispatch(closeModalShareAction(false));
};
exports.clearStateMyCheckLists = () => (dispatch) => {
    dispatch(clearStateMyCheckListsAction());
};
/* Action */
function showModalShareAction(checkListId) {
    return { type: modal_1.SHOW_MODAL_SHARE, checkListId };
}
function closeModalShareAction(isShow) {
    return { type: modal_1.CLOSE_MODAL_SHARE, isShow };
}
function loadCheckListsAction(checklists) {
    return { type: checkList_1.LOAD_MY_CHECK_LISTS, checklists };
}
function deleteCheckListAction(checkListId) {
    return { type: checkList_1.DELETE_MY_CHECK_LISTS, checkListId };
}
function clearStateMyCheckListsAction() {
    return { type: checkList_1.CLEAR_STATE_MY_CHECK_LIST };
}
function loadingAction(loading) {
    return { type: checkList_1.MY_CHECK_LIST_LOADING, loading };
}
