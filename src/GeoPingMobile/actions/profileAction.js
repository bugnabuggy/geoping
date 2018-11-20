"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const profile_1 = require("../constantsForReducer/profile");
exports.loadProfileData = (idUser) => (dispatch) => {
    const profileService = staticStorage_1.default.serviceLocator.get('IProfileServiceType');
    profileService.loadProfileData(idUser)
        .then((profile) => {
        dispatch(loadProfileDataAction(profile));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.changePassword = (password, newPassword) => (dispatch) => {
    const userService = staticStorage_1.default.serviceLocator.get('IUser');
    userService.changePassword(password, newPassword)
        .then((message) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(message, notificationTypeEnum_1.EnumNotificationType.Success)));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.updateProfileData = (data) => (dispatch) => {
    const profileService = staticStorage_1.default.serviceLocator.get('IProfileServiceType');
    profileService.updateProfileData(data)
        .then((profile) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Profile saved', notificationTypeEnum_1.EnumNotificationType.Success)));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.upgradeAccount = () => (dispatch) => {
    const co = 'a';
};
exports.showModalChangePassword = () => (dispatch) => {
    dispatch(showModalChangePasswordAction(true));
};
exports.closeModalChangePassword = () => (dispatch) => {
    dispatch(closeModalChangePasswordAction(false));
};
exports.saveAvatar = (avatar) => (dispatch) => {
    const profileService = staticStorage_1.default.serviceLocator.get('IProfileServiceType');
    profileService.saveAvatar(avatar)
        .then((response) => {
        dispatch(saveAvatarAction(response.avatar));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Avatar saved', notificationTypeEnum_1.EnumNotificationType.Success)));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
/* Action */
function closeModalChangePasswordAction(isShow) {
    return { type: profile_1.CLOSE_MODAL_WINDOW, isShow };
}
function showModalChangePasswordAction(isShow) {
    return { type: profile_1.SHOW_MODAL_WINDOW, isShow };
}
function loadProfileDataAction(profile) {
    return { type: profile_1.LOAD_INFO, profile };
}
function saveAvatarAction(avatar) {
    return { type: profile_1.SAVE_AVATAR, avatar };
}
