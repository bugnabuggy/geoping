"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const checkList_1 = require("../constantsForReducer/checkList");
const filters_1 = require("../constantsForReducer/filters");
const dashboardFiltersMockService_1 = require("../services/mockServices/dashboardFiltersMockService");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const notificationsAction_1 = require("./notificationsAction");
const httpMapService_1 = require("../services/httpMapService");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const googleMapAction_1 = require("./googleMapAction");
const windowAction_1 = require("./windowAction");
exports.checkGEOPosition = () => (dispatch) => {
    window.navigator.geolocation.getCurrentPosition((location) => {
        httpMapService_1.getLocationAddress(location.coords.latitude, location.coords.longitude)
            .then((response) => {
            const marker = {
                id: '',
                idList: '',
                name: '',
                radius: 0,
                description: response.data.results[0].formatted_address,
                lat: Number(location.coords.latitude),
                lng: Number(location.coords.longitude),
                idForMap: uuid_1.v4(),
            };
            // dispatch( addPointAction( marker ) );
        })
            .catch((error) => {
            dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        });
    }, (error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.createCheckList = (nameChecklist) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.createMyCheckList(nameChecklist)
        .then((checkList) => {
        dispatch(createCheckListAction(checkList));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('Check List creating', notificationTypeEnum_1.EnumNotificationType.Success)));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.filterCheckLists = () => (dispatch) => {
    dashboardFiltersMockService_1.dashboardFiltersMockService('filterCheckLists')
        .then(() => {
        dispatch(filterCheckListsAction(true));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.closeFilterCheckLists = () => (dispatch) => {
    dispatch(closeFilterCheckListsAction(false));
};
exports.updateNameCheckList = (newNameCheckList) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.updateNameMyCheckList(newNameCheckList)
        .then((response) => {
        dispatch(changeNameCheckListAction(response));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification('List name changed', notificationTypeEnum_1.EnumNotificationType.Success)));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.updateCheckList = (idCheckList, checkList) => (dispatch) => {
    dispatch(windowAction_1.windowBlockingAction(true));
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    checkListService.updateMyCheckList(idCheckList, checkList)
        .then((response) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(updateCheckListAction(response));
    })
        .catch((error) => {
        dispatch(windowAction_1.windowBlockingAction(false));
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.openModalForCreateCheckList = () => (dispatch) => {
    dispatch(openModalForCreateCheckListAction(true));
};
exports.closeModalForCreateCheckList = () => (dispatch) => {
    dispatch(closeModalForCreateCheckListAction(false));
};
exports.editingPermission = (isEditing) => (dispatch) => {
    dispatch(editingPermissionAction(isEditing));
};
exports.changeNameCheckList = (nameChecklist) => (dispatch) => {
    dispatch(changeNameCheckListAction(nameChecklist));
};
exports.modalPeriodOpenClose = (isState) => (dispatch) => {
    dispatch(modalPeriodOpenCloseAction(isState));
};
exports.addNewPointForMyGeoPosition = (isMyGeoPosition) => (dispatch) => {
    dispatch(addNewPointForMyGeoPositionAction(isMyGeoPosition));
};
exports.loadCheckListData = (idCheckList) => (dispatch) => {
    const checkListService = staticStorage_1.default.serviceLocator.get('ICheckListServiceType');
    const markerService = staticStorage_1.default.serviceLocator.get('IMarkerServiceType');
    checkListService.loadMyCheckList(idCheckList)
        .then((response) => {
        dispatch(loadCheckListDataAction(helper_1.getDataFromResponse(response)));
        dispatch(loadMarkersForCheckListAction(true));
        return markerService.getAllMarkersForCheckList(idCheckList);
    })
        .then((response) => {
        dispatch(googleMapAction_1.addListPointsAction(helper_1.getDataFromResponse(response)));
        dispatch(loadMarkersForCheckListAction(false));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        dispatch(loadMarkersForCheckListAction(false));
    });
};
exports.clearStateCheckList = () => (dispatch) => {
    dispatch(clearStateCheckListAction());
};
exports.selectCheckList = (checkList) => (dispatch) => {
    dispatch(selectCheckListAction(checkList));
};
exports.isCheckListPage = (isCheckList) => (dispatch) => {
    dispatch(isCheckListPageAction(isCheckList));
};
/* Actions */
function createCheckListAction(checklist) {
    return { type: checkList_1.CREATE_CHECK_LIST, checklist };
}
function openModalForCreateCheckListAction(isShow) {
    return { type: checkList_1.OPEN_MODAL_FOR_CREATE_CHECK_LIST, isShow };
}
function closeModalForCreateCheckListAction(isClose) {
    return { type: checkList_1.CLOSE_MODAL_FOR_CREATE_CHECK_LIST, isClose };
}
function editingPermissionAction(isEditing) {
    return { type: checkList_1.EDITING_PERMISSION_POINT, isEditing };
}
function changeNameCheckListAction(nameChecklist) {
    return { type: checkList_1.CHANGE_NAME_CHECK_LIST, nameChecklist };
}
function modalPeriodOpenCloseAction(isState) {
    return { type: checkList_1.MODAL_PERIOD_OPEN_CLOSE, isState };
}
function filterCheckListsAction(isShow) {
    return { type: filters_1.FILTER_CHECKLIST_LIST, isShow };
}
function closeFilterCheckListsAction(isShow) {
    return { type: filters_1.CLOSE_FILTER_CHECKLIST, isShow };
}
function addNewPointForMyGeoPositionAction(isMyGeoPosition) {
    return { type: checkList_1.ADD_GEO_POINT_FROM_MY_POSITION, isMyGeoPosition };
}
function loadCheckListDataAction(checkList) {
    return { type: checkList_1.LOAD_CHECK_LIST_DATA, checkList };
}
function clearStateCheckListAction() {
    return { type: checkList_1.CLEAR_STATE_CHECK_LIST };
}
function loadMarkersForCheckListAction(isLoading) {
    return { type: checkList_1.LOAD_MARKERS_FOR_CHECK_LIST, isLoading };
}
function selectCheckListAction(checkList) {
    return { type: checkList_1.SELECT_CHECK_LIST, checkList };
}
function updateCheckListAction(checkList) {
    return { type: checkList_1.UPDATE_CHECK_LIST, checkList };
}
function isCheckListPageAction(isCheckList) {
    return { type: checkList_1.IS_CHECK_LIST_PAGE, isCheckList };
}
