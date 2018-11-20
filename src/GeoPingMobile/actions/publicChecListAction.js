"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publicCheckList_1 = require("../constantsForReducer/publicCheckList");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
exports.changeFilter = (nameFilter, value) => (dispatch) => {
    dispatch(changeFilterAction({ nameFilter, value }));
};
exports.changePagination = (numberPage) => (dispatch) => {
    dispatch(changePaginationAction(numberPage));
};
exports.loadPublicLists = () => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.loadPublicCheckLists()
        .then((response) => {
        dispatch(loadListsAction(response));
    })
        .catch((error) => {
        try {
            dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        }
        catch (e) {
            dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Error loading lists', notificationTypeEnum_1.EnumNotificationType.Danger)));
        }
    });
};
exports.filterPublicCheckLists = (filters) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.filterPublicCheckList(filters)
        .then((response) => {
        dispatch(loadListsAction(response));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
/* Action */
function changeFilterAction(filter) {
    return { type: publicCheckList_1.PUBLIC_LIST_CHANGE_FILTER, filter };
}
function changePaginationAction(numberPage) {
    return { type: publicCheckList_1.PUBLIC_LIST_CHANGE_PAGINATION, numberPage };
}
function loadListsAction(lists) {
    return { type: publicCheckList_1.PUBLIC_LIST_LOAD_LISTS, lists };
}
