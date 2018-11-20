"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notificationsState_1 = require("../state/notificationsState");
const notification_1 = require("../constantsForReducer/notification");
function notificationsReducer(state = notificationsState_1.notificationState, action) {
    const reduceObject = {
        [notification_1.ADD_NOTIFICATION]: addNotification,
        [notification_1.DELETE_NOTIFICATION]: deleteNotification,
        [notification_1.DELETE_ALL_NOTIFICATIONS]: addAllNotification,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = notificationsReducer;
function addNotification(state, action) {
    const newState = Object.assign({}, state, {
        notificationList: [
            ...state.notificationList,
            action.notification
        ]
    });
    return newState;
}
function deleteNotification(state, action) {
    const newState = { notificationList: [] };
    newState.notificationList = state.notificationList.filter((item, index) => item.id !== action.idNotification);
    return newState;
}
function addAllNotification(state, action) {
    const newState = Object.assign({}, state, { notificationList: [] });
    return newState;
}
