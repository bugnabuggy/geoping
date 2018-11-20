"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("../constantsForReducer/notification");
const helper_1 = require("../services/helper");
exports.addNotification = (message, typeNotification) => (dispatch) => {
    const notification = helper_1.createNotification(message, typeNotification);
    dispatch(addNotificationAction(notification));
    return notification.id;
};
exports.deleteNotification = (idNotification) => (dispatch) => {
    dispatch(deleteNotificationAction(idNotification));
};
exports.deleteAllNotifications = () => (dispatch) => {
    dispatch(deleteAllNotificationsAction());
};
/* Actions */
function addNotificationAction(notification) {
    return { type: notification_1.ADD_NOTIFICATION, notification };
}
exports.addNotificationAction = addNotificationAction;
function deleteNotificationAction(idNotification) {
    return { type: notification_1.DELETE_NOTIFICATION, idNotification };
}
function deleteAllNotificationsAction() {
    return { type: notification_1.DELETE_ALL_NOTIFICATIONS };
}
