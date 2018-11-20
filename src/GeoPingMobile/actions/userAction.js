"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../constantsForReducer/user");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const windowAction_1 = require("./windowAction");
exports.authorizationUser = (email, password) => (dispatch) => {
    dispatch(windowAction_1.windowBlockingAction(true));
    const authorizeService = staticStorage_1.default.serviceLocator.get('IAuthorization');
    authorizeService.signin(email, password)
        .then((token) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(authorizationUserAction(true));
        dispatch(redirectDaschboardAction(true));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('You authorized', notificationTypeEnum_1.EnumNotificationType.Success)));
    })
        .catch((error) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Invalid user name or password', notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.registrationUser = (registrationUserData) => (dispatch) => {
    dispatch(windowAction_1.windowBlockingAction(true));
    const authorizeService = staticStorage_1.default.serviceLocator.get('IAuthorization');
    authorizeService.registrationUser(registrationUserData)
        .then((response) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('You registered', notificationTypeEnum_1.EnumNotificationType.Success)));
        exports.authorizationUser(registrationUserData.login, registrationUserData.password)(dispatch);
    })
        .catch((error) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.response.data.messages[0], notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.resetPasswordEnterLoginOrEmail = (emailOrLogin) => (dispatch) => {
    return '';
};
exports.resetPasswordEnterNewPassword = (newPassword) => (dispatch) => {
    return '';
};
exports.signOutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    dispatch(signOutUserAction());
};
exports.authorizationUserFlag = (isAuthorize) => (dispatch) => {
    dispatch(authorizationUserAction(isAuthorize));
};
exports.redirectDashboard = (isRedirect) => (dispatch) => {
    dispatch(redirectDaschboardAction(isRedirect));
};
exports.loadUserData = () => (dispatch) => {
    windowAction_1.windowBlocking(true)(dispatch);
    const userService = staticStorage_1.default.serviceLocator.get('IUser');
    userService.loadUserData()
        .then((userData) => {
        windowAction_1.windowBlocking(false)(dispatch);
        dispatch(loadUserDataAction(userData));
    })
        .catch((error) => {
        windowAction_1.windowBlocking(false)(dispatch);
        if (error.response.status === 401) {
            windowAction_1.redirectOnSignInForm(true)(dispatch);
        }
        else {
            dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        }
    });
};
/* Actions */
function authorizationUserAction(authorization) {
    return { type: user_1.USER_AUTHORIZATION, authorization };
}
function signOutUserAction() {
    return { type: user_1.USER_SIGN_OUT };
}
function redirectDaschboardAction(isRedirect) {
    return { type: user_1.REDIRECT_DASHBOARD_FOR_LOGIN, isRedirect };
}
exports.redirectDaschboardAction = redirectDaschboardAction;
function loadUserDataAction(userData) {
    return { type: user_1.LOAD_USER_NAME, userData };
}
exports.loadUserDataAction = loadUserDataAction;
