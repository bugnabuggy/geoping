"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkin_1 = require("../constantsForReducer/checkin");
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const googleMapAction_1 = require("./googleMapAction");
exports.checkIn = (idList, idPoint, data) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.addCheckIn(idList, idPoint, data)
        .then((response) => {
        const geoPoint = [response];
        dispatch(getAllChecksForUserAndListAction(geoPoint));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Point marked', notificationTypeEnum_1.EnumNotificationType.Success)));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
/* load */
exports.loadLists = () => (dispatch) => {
    dispatch(loadingCheckLists(true));
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.loadAllMyCheckLists()
        .then((response) => {
        dispatch(loadListsAction(response));
        dispatch(loadingCheckLists(false));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        dispatch(loadingCheckLists(false));
    });
};
exports.loadPoints = (idList) => (dispatch) => {
    dispatch(loadingGeoPoints(true));
    const markerService = staticStorage_1.default.serviceLocator.get('IMarkerServiceType');
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.getAllChecksForUserAndList(idList)
        .then((checkInGeoPoint) => {
        dispatch(getAllChecksForUserAndListAction(checkInGeoPoint || []));
        return markerService.getAllMarkersForCheckList(idList);
    })
        .then((response) => {
        dispatch(googleMapAction_1.addListPointsAction(response));
        dispatch(loadingGeoPoints(false));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        dispatch(loadingGeoPoints(false));
    });
};
exports.checkinFlag = (isCheckin) => (dispatch) => {
    dispatch(checkinFlagAction(isCheckin));
};
exports.checkInClear = () => (dispatch) => {
    dispatch(checkInClearAction());
};
exports.messagesForUser = (message, type) => (dispatch) => {
    dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(message, type)));
};
exports.getAllChecksForUserAndList = (idList) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.getAllChecksForUserAndList(idList)
        .then((checkInGeoPoint) => {
        dispatch(getAllChecksForUserAndListAction(checkInGeoPoint));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.selectList = (idList) => (dispatch) => {
    dispatch(selectedListAction(idList));
    // getAllChecksForUserAndList( idList )( dispatch );
};
/* Actions */
function loadListsAction(lists) {
    return { type: checkin_1.CHECK_IN_LOAD_LISTS, lists };
}
function selectedListAction(idList) {
    return { type: checkin_1.CHECK_IN_SELECT_LIST, idList };
}
function checkinFlagAction(isCheckin) {
    return { type: checkin_1.CHECK_IN_FLAG_CHANGE, isCheckin };
}
function loadingCheckLists(isLoading) {
    return { type: checkin_1.LOADING_CHECK_LISTS, isLoading };
}
function loadingGeoPoints(isLoading) {
    return { type: checkin_1.LOADING_GEO_POINTS, isLoading };
}
function checkInClearAction() {
    return { type: checkin_1.CHECK_IN_CLEAR };
}
function getAllChecksForUserAndListAction(checkInGeoPoint) {
    return { type: checkin_1.CHECK_IN_GEO_POINTS, checkInGeoPoint };
}
