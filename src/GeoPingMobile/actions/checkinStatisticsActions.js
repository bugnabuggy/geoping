"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkinStatistics_1 = require("../constantsForReducer/checkinStatistics");
const helper_1 = require("../services/helper");
const notificationsAction_1 = require("./notificationsAction");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const checkList_1 = require("../constantsForReducer/checkList");
const windowAction_1 = require("./windowAction");
exports.selectList = () => (dispatch) => {
    return '';
};
/* Load */
exports.loadLists = () => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.loadAllMyCheckLists()
        .then((response) => {
        dispatch(loadListsAction(response));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.loadUsers = (idList) => (dispatch) => {
    const userService = staticStorage_1.default.serviceLocator.get('IUser');
    userService.loadUserForStatistic(idList)
        .then((response) => {
        dispatch(loadUsersAction(response));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.loadPoints = (listId, userId, dateFrom, dateTo) => (dispatch) => {
    dispatch(windowAction_1.windowBlockingAction(true));
    const markerService = staticStorage_1.default.serviceLocator.get('IMarkerServiceType');
    markerService.getChecksStatisticsForList(listId, userId, dateFrom, dateTo)
        .then((response) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(loadPointsAction(response));
    })
        .catch((error) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.checkInStatisticsClear = () => (dispatch) => {
    dispatch(checkInStatisticsClearAction());
};
exports.getAllCheckForList = (idList) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.getAllCheckForList(idList)
        .then((response) => {
        console.info(response);
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
/* Actions*/
function loadListsAction(checklists) {
    return { type: checkList_1.LOAD_MY_CHECK_LISTS, checklists };
}
function loadUsersAction(users) {
    return { type: checkinStatistics_1.STATISTICS_LOAD_USERS, users };
}
function loadPointsAction(points) {
    return { type: checkinStatistics_1.STATISTICS_LOAD_POINTS, points };
}
function checkInStatisticsClearAction() {
    return { type: checkinStatistics_1.STATISTICS_CLEAR };
}
