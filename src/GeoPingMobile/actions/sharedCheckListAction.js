"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const sharedCheckList_1 = require("../constantsForReducer/sharedCheckList");
exports.loadUsersForShared = (idList) => (dispatch) => {
    dispatch(loadingUsersWhoHasAccess(true));
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.loadUserWhoHasAccess(idList)
        .then((response) => {
        dispatch(loadUsersForSharedAction(response));
        dispatch(loadingUsersWhoHasAccess(false));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        dispatch(loadingUsersWhoHasAccess(false));
    });
};
exports.clearSharedCheckList = () => (dispatch) => {
    dispatch(clearSharedCheckListAction());
};
exports.sendAccessUsersForCheckList = (idCheckList, emails) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.sharedCheckListForUser(idCheckList, emails)
        .then((users) => {
        dispatch(sendAccessUsersForCheckListAction(users));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.providePublicAccess = (idList, isPublic) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.providePublicAccess(idList, isPublic)
        .then((response) => {
        dispatch(providePublicAccessAction(idList, isPublic));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
/* Actions */
function loadUsersForSharedAction(usersList) {
    return { type: sharedCheckList_1.LOAD_USERS_LIST_WITCH_SHARED_ACCESS, usersList };
}
function clearSharedCheckListAction() {
    return { type: sharedCheckList_1.CLEAR_SHARED_CHECK_LIST };
}
function sendAccessUsersForCheckListAction(users) {
    return { type: sharedCheckList_1.SEND_SHARE_CHECK_LIST_FOR_USERS, users };
}
function providePublicAccessAction(idList, isPublic) {
    return { type: sharedCheckList_1.PROVIDE_PUBLIC_ACCESS, idList, isPublic };
}
function loadingUsersWhoHasAccess(isLoading) {
    return { type: sharedCheckList_1.LOADING_USERS_WHO_HAS_ACCESS, isLoading };
}
