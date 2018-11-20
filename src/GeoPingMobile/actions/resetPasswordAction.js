"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resetPassword_1 = require("../constantsForReducer/resetPassword");
const windowAction_1 = require("./windowAction");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const routes_1 = require("../constants/routes");
exports.sendLoginOrEmail = (loginOrEmail) => (dispatch) => {
    dispatch(windowAction_1.windowBlockingAction(true));
    const userService = staticStorage_1.default.serviceLocator.get('IUser');
    userService.sendLoginOrEmail(loginOrEmail)
        .then((response) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(response, notificationTypeEnum_1.EnumNotificationType.Success)));
        windowAction_1.isRedirect(routes_1.loginUrl)(dispatch);
    })
        .catch((error) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Login or email not found', notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.sendNewPassword = (userId, token, newPassword) => (dispatch) => {
    dispatch(windowAction_1.windowBlockingAction(true));
    const userService = staticStorage_1.default.serviceLocator.get('IUser');
    userService.sendNewPassword(userId, token, newPassword)
        .then((response) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        console.info('response', response);
        windowAction_1.isRedirect(routes_1.loginUrl)(dispatch);
    })
        .catch((error) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Failed to change password', notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
/* Actions */
function sendLoginOrEmailAction(loginOrEmail) {
    return { type: resetPassword_1.SEND_LOGIN_OR_EMAIL, loginOrEmail };
}
function sendNewPasswordAction(newPassword) {
    return { type: resetPassword_1.SEND_NEW_PASSWORD, newPassword };
}
