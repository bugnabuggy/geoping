"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleMap_1 = require("../constantsForReducer/googleMap");
const notificationsAction_1 = require("./notificationsAction");
const helper_1 = require("../services/helper");
const notificationTypeEnum_1 = require("../enums/notificationTypeEnum");
const staticStorage_1 = __importDefault(require("../services/staticStorage"));
const checkListAction_1 = require("./checkListAction");
exports.getListPoints = (idCheckList) => (dispatch) => {
    const markerService = staticStorage_1.default.serviceLocator.get('IMarkerServiceType');
    markerService.getAllMarkersForCheckList(idCheckList)
        .then((geoPoints) => {
        dispatch(addListPointsAction(geoPoints));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.selectPoint = (geoPoint) => (dispatch) => {
    dispatch(selectPointAction(geoPoint));
    if (!geoPoint.id) {
        dispatch(addDistanceAction(null));
    }
};
exports.deleteGeoPoint = (geoPoint) => (dispatch) => {
    // if ( statusMarker === EnumStatusMarker.Edit || statusMarker === EnumStatusMarker.None ) {
    if (geoPoint.id) {
        const markerService = staticStorage_1.default.serviceLocator.get('IMarkerServiceType');
        markerService.deleteMarker(geoPoint.idList, geoPoint.id)
            .then((response) => {
            dispatch(deleteGeoPointAction(geoPoint.idForMap));
        })
            .catch((error) => {
            dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
        });
    }
    else {
        // dispatch ( deleteGeoPointAction ( '' ) );
        dispatch(deleteGeoPointAction(geoPoint.idForMap));
    }
    // } else if ( statusMarker === EnumStatusMarker.New ) {
    //   dispatch ( deleteGeoPointAction ( geoPoint.idForMap ) );
    // }
};
exports.addNewPoint = (geoPoint) => (dispatch) => {
    dispatch(addNewPointAction(geoPoint));
    checkListAction_1.editingPermission(true)(dispatch);
};
exports.getGeoLocation = (latitude, longitude) => (dispatch) => {
    const position = {
        lng: longitude,
        lat: latitude,
        isSuccess: true,
        address: '',
    };
    dispatch(findGeoPositionAction(position));
};
// export const findGeoPosition = () => ( dispatch: IDispatchFunction ) => {
//   window.navigator.geolocation.getCurrentPosition(
//     ( location: any ) => {
//       const position: IPosition = {
//         lng: location.coords.longitude,
//         lat: location.coords.latitude,
//         isSuccess: true,
//         address: '',
//       };
//       dispatch( findGeoPositionAction( position ) );
//     },
//     ( error: any ) => {
//       if ( error.code === 1 ) {
//         dispatch( addNotificationAction( createNotification(
//           'Please allow access to browser geo location',
//           EnumNotificationType.Danger ) ) );
//       } else {
//         dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
//       }
//     } );
// };
//
// export const getMyAddress = () => ( dispatch: IDispatchFunction ) => {
//   window.navigator.geolocation.getCurrentPosition(
//     ( location: any ) => {
//       const pos: any = {
//         lng: location.coords.longitude,
//         lat: location.coords.latitude,
//       };
//       getGeoCode( pos )
//         .then( ( address: string ) => {
//           const position: IPosition = {
//             lng: location.coords.longitude,
//             lat: location.coords.latitude,
//             isSuccess: true,
//             address: address,
//           };
//           dispatch( findGeoPositionAction( position ) );
//         } )
//         .catch( ( error: any ) => {
//           dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
//         } );
//     },
//     ( error: any ) => {
//       dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
//     } );
// };
exports.permissionAdd = (isPermissionAdd) => (dispatch) => {
    dispatch(permissionAddAction(isPermissionAdd));
};
exports.changeMovingGeoPoint = (geoPoint) => (dispatch) => {
    dispatch(changeMovingGeoPointAction(geoPoint));
};
exports.createGeoPoint = (marker) => (dispatch) => {
    const markerService = staticStorage_1.default.serviceLocator.get('IMarkerServiceType');
    markerService.createNewMarker(marker)
        .then((geoPoint) => {
        console.log('create');
        dispatch(saveGeoPointAction(geoPoint));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.updateGeoPoint = (marker) => (dispatch) => {
    const markerService = staticStorage_1.default.serviceLocator.get('IMarkerServiceType');
    markerService.updateMarker(marker)
        .then((geoPoint) => {
        dispatch(saveGeoPointAction(geoPoint));
    })
        .catch((error) => {
        dispatch(notificationsAction_1.addNotificationAction(helper_1.createNotification(error.message, notificationTypeEnum_1.EnumNotificationType.Danger)));
    });
};
exports.saveGeoPoint = (geoPoint) => (dispatch) => {
    if (!geoPoint.id) {
        exports.createGeoPoint(geoPoint)(dispatch);
    }
    else {
        exports.updateGeoPoint(geoPoint)(dispatch);
    }
};
exports.cancelGeoPoint = () => (dispatch) => {
    dispatch(cancelGeoPointAction());
};
exports.changeDataGeoPoint = (field, data) => (dispatch) => {
    dispatch(changeDataGeoPointAction(field, data));
};
exports.geoPointListIsCreate = (isGeoPointListIsCreated) => (dispatch) => {
    dispatch(geoPointListIsCreateAction(isGeoPointListIsCreated));
};
exports.addDistance = (distance) => (dispatch) => {
    dispatch(addDistanceAction(Math.round(distance)));
};
exports.clearStateGoogleMap = () => (dispatch) => {
    dispatch(clearStateGoogleMapAction());
};
exports.clearGeoPoint = () => (dispatch) => {
    dispatch(clearGeoPointAction());
};
/* Actions */
function addListPointsAction(geoPoints) {
    return { type: googleMap_1.ADD_LIST_POINTS, geoPoints };
}
exports.addListPointsAction = addListPointsAction;
function selectPointAction(geoPoint) {
    return { type: googleMap_1.SELECT_GEO_POINT, geoPoint };
}
function deleteGeoPointAction(idPoint) {
    return { type: googleMap_1.DELETE_GEO_POINT, idPoint };
}
function addNewPointAction(geoPoint) {
    return { type: googleMap_1.ADD_NEW_GEO_POINT, geoPoint };
}
function findGeoPositionAction(geoPosition) {
    return { type: googleMap_1.FIND_GEO_POSITION, geoPosition };
}
function permissionAddAction(isPermissionAdd) {
    return { type: googleMap_1.PERMISSION_TO_ADD, isPermissionAdd };
}
function changeMovingGeoPointAction(geoPoint) {
    return { type: googleMap_1.CHANGE_MOVING_GEO_POINT, geoPoint };
}
function saveGeoPointAction(geoPoint) {
    return { type: googleMap_1.SAVE_GEO_POINT, geoPoint };
}
function changeDataGeoPointAction(field, data) {
    return { type: googleMap_1.CHANGE_DATA_GEO_POINT, field, data };
}
function cancelGeoPointAction() {
    return { type: googleMap_1.CANCEL_GEO_POINT };
}
function geoPointListIsCreateAction(listCreated) {
    return { type: googleMap_1.GEO_POINT_LIST_IS_CREATED, listCreated };
}
function addDistanceAction(distance) {
    return { type: googleMap_1.ADD_DISTANCE_BETWEEN_POINTS, distance };
}
function clearStateGoogleMapAction() {
    return { type: googleMap_1.CLEAR_STATE_GOOGLE_MAP };
}
function clearGeoPointAction() {
    return { type: googleMap_1.CLEAR_GEO_POINT };
}
