"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboardFiltersMockService_1 = require("../services/mockServices/dashboardFiltersMockService");
const filters_1 = require("../constantsForReducer/filters");
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
exports.filterInvitations = () => (dispatch) => {
    dashboardFiltersMockService_1.dashboardFiltersMockService('filterInvitations')
        .then(() => {
        dispatch(filterInvitationsAction(true));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.closeFilterInvitations = () => (dispatch) => {
    dispatch(closeFilterInvitationsAction(false));
};
function filterInvitationsAction(isShow) {
    return { type: filters_1.FILTER_INVITATIONS_LIST, isShow };
}
function closeFilterInvitationsAction(isShow) {
    return { type: filters_1.CLOSE_FILTER_INVITATIONS, isShow };
}
