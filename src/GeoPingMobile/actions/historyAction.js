"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filters_1 = require("../constantsForReducer/filters");
const dashboardFiltersMockService_1 = require("../services/mockServices/dashboardFiltersMockService");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const historyTable_1 = require("../constantsForReducer/historyTable");
exports.loadHistory = () => (dispatch) => {
    dispatch(loadingAction(true));
    const tableHistoryService = staticStorage_1.default.serviceLocator.get('ITableHistoryService');
    tableHistoryService.getHistory()
        .then((response) => {
        dispatch(loadHistoryAction(response));
        dispatch(loadingAction(false));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        dispatch(loadingAction(false));
    });
};
exports.filterHistory = () => (dispatch) => {
    dashboardFiltersMockService_1.dashboardFiltersMockService('filterHistory')
        .then(() => {
        dispatch(filterHistoryAction(true));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.closeFilterHistory = () => (dispatch) => {
    dispatch(closeFilterHistoryAction(false));
};
exports.saveHistory = (idUser, historyData) => (dispatch) => {
    const tableHistoryService = staticStorage_1.default.serviceLocator.get('ITableHistoryService');
    tableHistoryService.addRecordForHistory(idUser, historyData)
        .then((response) => {
        dispatch(saveHistoryAction(historyData));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.clearTableHistory = () => (dispatch) => {
    dispatch(clearTableHistoryAction());
};
/* Actions */
function filterHistoryAction(isShow) {
    return { type: filters_1.FILTER_HISTORY_TABLE, isShow };
}
function closeFilterHistoryAction(isShow) {
    return { type: filters_1.CLOSE_FILTER_HISTORY, isShow };
}
function loadHistoryAction(history) {
    return { type: historyTable_1.LOAD_LIST_HISTORY, history };
}
function saveHistoryAction(historyData) {
    return { type: historyTable_1.SAVE_RECORD_HISTORY, historyData };
}
function loadingAction(isLoading) {
    return { type: historyTable_1.TABLE_HISTORY_LOADING, isLoading };
}
function clearTableHistoryAction() {
    return { type: historyTable_1.CLEAR_TABLE_HISTORY };
}
