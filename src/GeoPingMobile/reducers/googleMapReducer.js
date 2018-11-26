"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleMapState_1 = require("../state/googleMapState");
const googleMap_1 = require("../constantsForReducer/googleMap");
const statusMarker_1 = require("../enums/statusMarker");
const defaultMarker_1 = require("../constants/defaultMarker");
const checkin_1 = require("../constantsForReducer/checkin");
const checkList_1 = require("../constantsForReducer/checkList");
const checkinStatistics_1 = require("../constantsForReducer/checkinStatistics");
const uuid_1 = require("uuid");
function googleMapReducer(state = googleMapState_1.googleMapState, action) {
    const reduceObject = {
        [googleMap_1.ADD_LIST_POINTS]: addListPoints,
        [googleMap_1.SELECT_GEO_POINT]: selectGeoPoint,
        [googleMap_1.DELETE_GEO_POINT]: deleteGEOPoint,
        [googleMap_1.ADD_NEW_GEO_POINT]: addNewGeoPoint,
        [googleMap_1.FIND_GEO_POSITION]: findGeoPosition,
        [googleMap_1.PERMISSION_TO_ADD]: permissionAdd,
        [googleMap_1.CHANGE_MOVING_GEO_POINT]: changeMovingGeoPoint,
        [googleMap_1.SAVE_GEO_POINT]: saveGeoPoint,
        [googleMap_1.CANCEL_GEO_POINT]: cancelGeoPoint,
        [googleMap_1.CHANGE_DATA_GEO_POINT]: changeDataGeoPoint,
        [checkList_1.ADD_GEO_POINT_FROM_MY_POSITION]: addGeoPointFromMyPosition,
        [googleMap_1.GEO_POINT_LIST_IS_CREATED]: geoPointListCreate,
        [checkin_1.CHECK_IN_SELECT_LIST]: checkInSelectList,
        [googleMap_1.CLEAR_STATE_GOOGLE_MAP]: clearStateGoogleMap,
        [checkinStatistics_1.STATISTICS_LOAD_POINTS]: statisticsLoadPoints,
        [googleMap_1.CLEAR_GEO_POINT]: clearGeoPoint,
        [checkin_1.CHECK_IN_GEO_POINTS]: checkInGeoPoint,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = googleMapReducer;
function addListPoints(state, action) {
    return Object.assign({}, state, { geoPoints: action.geoPoints, isGeoPointListIsCreated: false });
}
function selectGeoPoint(state, action) {
    return Object.assign({}, state, { selectedGeoPoint: state.geoPoints.find(geoPoint => geoPoint.id === action.geoPoint.id) || action.geoPoint, statusMarker: action.geoPoint.id ? statusMarker_1.EnumStatusMarker.Edit : statusMarker_1.EnumStatusMarker.None });
}
function deleteGEOPoint(state, action) {
    return Object.assign({}, state, { geoPoints: state.geoPoints.filter(geoPoint => geoPoint.idForMap !== action.idPoint), idDeleteMarker: action.idPoint });
}
function addNewGeoPoint(state, action) {
    return Object.assign({}, state, { geoPoints: [
            ...state.geoPoints,
            action.geoPoint
        ], selectedGeoPoint: Object.assign({}, action.geoPoint, { radius: 50 }), statusMarker: statusMarker_1.EnumStatusMarker.New });
}
function findGeoPosition(state, action) {
    return Object.assign({}, state, { position: action.geoPosition });
}
function permissionAdd(state, action) {
    return Object.assign({}, state, { isAddMarker: action.isPermissionAdd });
}
function changeMovingGeoPoint(state, action) {
    const tempGeoPoint = state.geoPoints
        .find((geoPoint) => geoPoint.id === state.selectedGeoPoint.id);
    const moveStartMarker = state.statusMarker === statusMarker_1.EnumStatusMarker.Edit ?
        {
            lat: tempGeoPoint.lat,
            lng: tempGeoPoint.lng,
        }
        :
            {
                lng: null,
                lat: null,
            };
    return Object.assign({}, state, { moveStartMarker: moveStartMarker, selectedGeoPoint: Object.assign({}, state.selectedGeoPoint, action.geoPoint) });
}
function saveGeoPoint(state, action) {
    const newGeoListGeopoints = state.statusMarker === statusMarker_1.EnumStatusMarker.New ?
        [
            ...state.geoPoints.filter(item => !!item.id),
            action.geoPoint,
        ]
        :
            state.statusMarker === statusMarker_1.EnumStatusMarker.Edit ?
                [
                    ...state.geoPoints.map(item => {
                        return item.id === action.geoPoint.id ? action.geoPoint : item;
                    }),
                ]
                :
                    [
                        ...state.geoPoints,
                    ];
    return Object.assign({}, state, { geoPoints: [
            ...newGeoListGeopoints,
        ], selectedGeoPoint: googleMapState_1.googleMapState.selectedGeoPoint, statusMarker: statusMarker_1.EnumStatusMarker.None });
}
function cancelGeoPoint(state, action) {
    if (state.statusMarker === statusMarker_1.EnumStatusMarker.New) {
        return Object.assign({}, state, { geoPoints: [
                ...state.geoPoints.filter(item => {
                    return item.idForMap !== state.selectedGeoPoint.idForMap;
                })
            ], idDeleteMarker: state.selectedGeoPoint.id, selectedGeoPoint: googleMapState_1.googleMapState.selectedGeoPoint, statusMarker: statusMarker_1.EnumStatusMarker.None });
    }
    else if (state.statusMarker === statusMarker_1.EnumStatusMarker.Edit) {
        let moveMarker = {};
        if (state.moveStartMarker.lat !== null && state.moveStartMarker.lng !== null) {
            moveMarker = Object.assign({}, state.moveStartMarker);
        }
        return Object.assign({}, state, { geoPoints: [
                ...state.geoPoints.map(item => {
                    return item.id === state.selectedGeoPoint.id ? Object.assign({}, item, moveMarker) :
                        item;
                })
            ], selectedGeoPoint: googleMapState_1.googleMapState.selectedGeoPoint, statusMarker: statusMarker_1.EnumStatusMarker.None });
    }
    return Object.assign({}, state);
}
function changeDataGeoPoint(state, action) {
    return Object.assign({}, state, { selectedGeoPoint: Object.assign({}, state.selectedGeoPoint, { [action.field]: action.data }) });
}
function addGeoPointFromMyPosition(state, action) {
    return Object.assign({}, state, { selectedGeoPoint: Object.assign({}, defaultMarker_1.defaultMarker, { lat: state.position.lat, lng: state.position.lng, radius: 50 }), statusMarker: statusMarker_1.EnumStatusMarker.New });
}
function geoPointListCreate(state, action) {
    return Object.assign({}, state, { isGeoPointListIsCreated: action.listCreated });
}
function checkInSelectList(state, action) {
    return Object.assign({}, state, { selectedGeoPoint: googleMapState_1.googleMapState.selectedGeoPoint });
}
function clearStateGoogleMap(state, action) {
    return Object.assign({}, googleMapState_1.googleMapState);
}
function statisticsLoadPoints(state, action) {
    return Object.assign({}, state, { geoPoints: action.points.map((item) => {
            const point = {
                id: item.point.id,
                name: item.point.name,
                radius: item.point.radius,
                idList: '',
                description: item.point.description,
                lng: item.point.longitude,
                lat: item.point.latitude,
                idForMap: uuid_1.v4(),
            };
            return point;
        }), checkInGeoPoint: action.points.map((item) => item.check), isGeoPointListIsCreated: false });
}
function clearGeoPoint(state, action) {
    return Object.assign({}, state, { geoPoints: googleMapState_1.googleMapState.geoPoints, selectedGeoPoint: googleMapState_1.googleMapState.selectedGeoPoint, statusMarker: googleMapState_1.googleMapState.statusMarker, isGeoPointListIsCreated: googleMapState_1.googleMapState.isGeoPointListIsCreated });
}
function checkInGeoPoint(state, action) {
    return Object.assign({}, state, { checkInGeoPoint: [
            ...state.checkInGeoPoint,
            ...action.checkInGeoPoint
        ] });
}
