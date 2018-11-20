"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const defaultMarker_1 = require("../constants/defaultMarker");
let _googleLib;
let _googleMap;
let _geoCoder;
let _markers = [];
let _circles = [];
let _options;
let _that;
let idUserMarker = '';
const redColor = 'AA0000';
const blueColor = '70aae9';
const pinColor = '26b430';
const pinColorCheckInSelected = 'fbd661';
// const iconSelectedGeoPointUrl: string = 'http://chart.apis.google.com/chart' +
//   `?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${pinColor}|0000FF`;
// const iconSelectedCheckInGeoPointUrl: string = 'http://chart.apis.google.com/chart' +
//   `?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${pinColorCheckInSelected}|0000FF`;
const iconUserGeoPointUrl = '/assets/images/card-pin.png';
const defaultTimeForAnimateMarkers = 300;
function getIconGeoPointUrl(color) {
    return 'http://chart.apis.google.com/chart' +
        `?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${color}|0000FF`;
}
function constructorMapService(google, options, that) {
    _googleLib = google;
    _options = options;
    _geoCoder = new google.maps.Geocoder();
    _that = that;
}
exports.constructorMapService = constructorMapService;
function createMapAPI() {
    createMap(document.getElementById('map'));
}
exports.createMapAPI = createMapAPI;
function setCenterMap(lat, lng) {
    _googleMap.setCenter({ lat, lng });
}
exports.setCenterMap = setCenterMap;
function createUserMarkerAPI() {
    iconUserGeoPoint(defaultTimeForAnimateMarkers);
}
exports.createUserMarkerAPI = createUserMarkerAPI;
function createPlaceSelectMarkerAPI() {
    iconSelectedGeoPoint(defaultTimeForAnimateMarkers);
}
exports.createPlaceSelectMarkerAPI = createPlaceSelectMarkerAPI;
function addListMarkersAPI(geoPoints) {
    createListMarkers(geoPoints);
}
exports.addListMarkersAPI = addListMarkersAPI;
function deleteMarkerAPI(idGeoPoint) {
    deleteGeoPoint(idGeoPoint);
}
exports.deleteMarkerAPI = deleteMarkerAPI;
function deleteAllMarkersAPI() {
    deleteAllGeoPoint();
    deleteAllCircles();
}
exports.deleteAllMarkersAPI = deleteAllMarkersAPI;
function deselectMarkerAPI(geoPoint) {
    clearIconSelectedGeoPoint(geoPoint);
}
exports.deselectMarkerAPI = deselectMarkerAPI;
function selectMarkerAPI(geoPoint) {
    setIconSelectedGeoPoint(geoPoint);
}
exports.selectMarkerAPI = selectMarkerAPI;
function getDistance() {
    const origin = new _googleLib.maps.LatLng(_that.props.googleMap.selectedGeoPoint.lat, _that.props.googleMap.selectedGeoPoint.lng);
    const destination = new _googleLib.maps.LatLng(_that.props.googleMap.position.lat, _that.props.googleMap.position.lng);
    const distance = _googleLib.maps.geometry.spherical.computeDistanceBetween(destination, origin);
    _that.props.addDistance(distance);
}
exports.getDistance = getDistance;
function setCoordinatesForUserMarker(coordinates) {
    if (idUserMarker) {
        const marker = findGeoPoint(idUserMarker);
        if (marker) {
            const latLng = {
                lat: coordinates.lat,
                lng: coordinates.lng,
            };
            setPosition(marker, latLng);
        }
    }
}
exports.setCoordinatesForUserMarker = setCoordinatesForUserMarker;
function createMap(htmlElement) {
    _googleMap = new _googleLib.maps.Map(htmlElement, _options);
    _googleMap.addListener('click', handleMapListener);
}
function iconSelectedGeoPoint(timeout, geoPoint) {
    setTimeout(() => {
        createGeoPoint(geoPoint, createMarkerImage(getIconGeoPointUrl(pinColor)), true);
    }, timeout);
}
function iconDefaultGeoPoint(timeout) {
    setTimeout(() => {
        createGeoPoint(_that.props.selectedGeoPoint, null, false);
    }, timeout);
}
function iconUserGeoPoint(timeout) {
    idUserMarker = uuid_1.v4();
    const userGeoPoint = Object.assign({}, defaultMarker_1.defaultMarker, { id: '', name: 'Me', lat: _that.props.googleMap.position.lat, lng: _that.props.googleMap.position.lng, idForMap: idUserMarker });
    setTimeout(() => {
        createGeoPoint(userGeoPoint, createMarkerImage(iconUserGeoPointUrl), false);
    }, timeout);
}
function setIconCheckInGeoPoint() {
    _that.props.googleMap.checkInGeoPoint.forEach((checkInPoint) => {
        _that.props.googleMap.geoPoints.forEach((point) => {
            if (point.id === checkInPoint.pointId) {
                const marker = findGeoPoint(point.idForMap);
                if (marker) {
                    marker.setIcon(createMarkerImage(getIconGeoPointUrl(pinColor)));
                }
            }
        });
    });
}
exports.setIconCheckInGeoPoint = setIconCheckInGeoPoint;
function setIconSelectedGeoPoint(geoPoint) {
    const marker = findGeoPoint(geoPoint.idForMap);
    // const circle: any = findCircles( geoPoint.idForMap );
    if (marker) {
        marker.setIcon(createMarkerImage(getIconGeoPointUrl(_that.props.isCheckIn ? pinColorCheckInSelected : pinColor)));
        // circle.setOptions( {
        //   fillColor: _that.props.isCheckIn ? `#${pinColorCheckInSelected}` : `#${pinColor}`,
        //   strokeColor: _that.props.isCheckIn ? `#${pinColorCheckInSelected}` : `#${pinColor}`
        // } );
        if (!_that.props.isCheckIn && !_that.props.checkInStatistics.isCheckInStatistics) {
            marker.setDraggable(true);
        }
        else {
            marker.setDraggable(false);
        }
    }
}
function setRadiusMarker(geoPoint) {
    const circle = findCircles(geoPoint.idForMap);
    if (circle) {
        circle.setOptions({
            radius: geoPoint.radius,
        });
    }
}
exports.setRadiusMarker = setRadiusMarker;
function clearIconSelectedGeoPoint(geoPoint) {
    const marker = findGeoPoint(geoPoint.idForMap);
    // const circle: any = findCircles( geoPoint.idForMap );
    if (marker) {
        marker.setIcon(null);
        marker.setDraggable(false);
        // circle.setOptions( {
        //   fillColor: `#${redColor}`,
        //   strokeColor: `#${redColor}`
        // } );
    }
}
function createListMarkers(geoPoints) {
    geoPoints.forEach((item) => {
        if (!_that.props.isCheckIn) {
            createGeoPoint(item, null, false);
        }
        else {
            const checkIn = !!_that.props.googleMap.checkInGeoPoint.find((il) => il.pointId === item.id);
            if (checkIn) {
                iconSelectedGeoPoint(100, item);
            }
            else {
                createGeoPoint(item, null, false);
            }
        }
    });
}
function createGeoPoint(geoPoint, imageMarker, draggable) {
    const marker = new _googleLib.maps.Marker({
        position: geoPoint,
        title: geoPoint.name || '',
        map: _googleMap,
        icon: imageMarker,
        draggable: draggable,
        idForMap: geoPoint.idForMap,
        animation: _googleLib.maps.Animation.DROP,
    });
    if (geoPoint.idForMap !== idUserMarker) {
        const circle = new _googleLib.maps.Circle({
            map: _googleMap,
            radius: geoPoint.radius,
            idForMap: geoPoint.idForMap,
            fillColor: `#${blueColor}`,
            fillOpacity: 0.35,
            strokeOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: `#${blueColor}`,
        });
        circle.bindTo('center', marker, 'position');
        _circles.push(circle);
    }
    marker.addListener('click', (e) => {
        handleGeoPointClick(e, geoPoint);
    });
    marker.addListener('drag', (e) => {
        handleGeoPointDrag(e);
    });
    _markers.push(marker);
}
function deleteGeoPoint(idGeoPoint) {
    const marker = findGeoPoint(idGeoPoint);
    const circle = findCircles(idGeoPoint);
    if (marker) {
        marker.setMap(null);
        circle.setMap(null);
        _markers = _markers.filter((point) => {
            return point.idForMap !== marker.idForMap;
        });
        _circles = _circles.filter((cir) => {
            return cir.idForMap !== circle.idForMap;
        });
    }
}
function deleteAllGeoPoint() {
    _markers = _markers.filter((marker) => {
        if (marker.idForMap !== idUserMarker) {
            marker.setMap(null);
        }
        else {
            return marker;
        }
    });
}
function deleteAllCircles() {
    _circles = _circles.filter((circle) => {
        if (circle.idForMap !== idUserMarker) {
            circle.setMap(null);
        }
        else {
            return circle;
        }
    });
}
function handleMapListener(event) {
    if (_that.props.googleMap.isAddMarker) {
        getGeoCode(event.latLng)
            .then((geocode) => {
            const newMarker = Object.assign({}, defaultMarker_1.defaultMarker, { id: '', lat: event.latLng.lat(), lng: event.latLng.lng(), description: geocode, idForMap: uuid_1.v4() });
            iconSelectedGeoPoint(400, newMarker);
            _that.props.addNewPoint(newMarker);
        });
        _that.props.permissionAdd(false);
        _that.props.editingPermission(true);
    }
}
function handleGeoPointClick(e, geoPoint) {
    if (_that.props.googleMap.selectedGeoPoint.idForMap !== geoPoint.idForMap) {
        _that.props.selectPoint(geoPoint);
        // if ( _that.props.isCheckIn ) {
        //   _that.props.editingPermission( false );
        // }
    }
}
function handleGeoPointDrag(e) {
    const newGeoPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
    };
    _that.props.changeMovingGeoPoint(newGeoPoint);
}
function getGeoCode(latLng) {
    return new Promise((resolve, reject) => {
        _geoCoder.geocode({
            latLng
        }, (results, status) => {
            if (status === _googleLib.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    resolve(results[0].formatted_address);
                }
            }
            else {
                reject(status);
            }
        });
    });
}
exports.getGeoCode = getGeoCode;
function settingPointsByCoordinates(geoPoints) {
    geoPoints.forEach((geoPoint) => {
        const marker = findGeoPoint(geoPoint.idForMap);
        if (marker) {
            const latLng = {
                lat: geoPoint.lat,
                lng: geoPoint.lng,
            };
            // marker.setPosition( latLng );
            setPosition(marker, latLng);
        }
    });
}
exports.settingPointsByCoordinates = settingPointsByCoordinates;
function addMyPositionPoint(geoPoint) {
    const merker = findGeoPoint(geoPoint.idForMap);
    if (!merker) {
        const latLng = {
            lat: geoPoint.lat,
            lng: geoPoint.lng,
        };
        getGeoCode(latLng)
            .then((geocode) => {
            const newGeoPoint = Object.assign({}, geoPoint, { description: geocode, idForMap: uuid_1.v4() });
            iconSelectedGeoPoint(200, newGeoPoint);
            _that.props.addNewPoint(newGeoPoint);
        });
    }
}
exports.addMyPositionPoint = addMyPositionPoint;
function createMarkerImage(iconUrl) {
    return new _googleLib.maps.MarkerImage(iconUrl, new _googleLib.maps.Size(45, 43), new _googleLib.maps.Point(0, 0), new _googleLib.maps.Point(13, 42), new _googleLib.maps.Size(50, 45));
}
function findGeoPoint(idGeoPoint) {
    return _markers.find(item => item.idForMap === idGeoPoint);
}
function findCircles(idGeoPoint) {
    return _circles.find(item => item.idForMap === idGeoPoint);
}
function setPosition(marker, coordinates) {
    const latLng = Object.assign({}, coordinates);
    marker.setPosition(latLng);
}
