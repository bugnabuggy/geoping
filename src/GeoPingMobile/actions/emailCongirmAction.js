"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const window_1 = require("../constantsForReducer/window");
exports.confirmEmail = (userId, token) => (dispatch) => {
    const userService = staticStorage_1.default.serviceLocator.get('IUser');
    userService.confirmEmail(userId, token)
        .then((response) => {
        dispatch(confirmEmailAction());
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
/* Actions */
function confirmEmailAction() {
    return { type: window_1.CONFIRM_EMAIL };
}
