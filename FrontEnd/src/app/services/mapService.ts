import { Injectable, ApplicationRef } from '@angular/core';
import { infoMarker } from '../models/infoMarker';

declare var google: any;

const defaultLat = 0.0000952;
const defaultLng = 0.00016586
// const defaultLng = 0.000130;

@Injectable()
export class MapService {

    latCenter: number = 54.97288463122321;
    lngCenter: number = 73.34232330322266;
    map: any;
    marker: any;
    centerMarker: any;
    countMoveStep: number = 100;
    stepCounter: number = 1;
    arrayMarkers = [];
    lat: number;
    lng: number;
    zoom: number = 11;
    latY: number;
    lngX: number;
    latstep: number;
    lngstep: number;
    changingDistanceBetweenMarkersOnLat: number;
    changingDistanceBetweenMarkersOnLng: number;
    changeDistanceStep: number = 0;
    changeDistance: number = 0;
    stop: any[];
    latDistance: number;
    lngDistance: number;
    timeOut: number;
    index: number = 0;
    elementInfoMarker: infoMarker;
    radius: number;
    serialNumber: number = 0;
    chooseNumberMarkers: number;
    labelIndex: number = 1;
    infowindow = new google.maps.InfoWindow;

    constructor(private ref: ApplicationRef) {
        this.moveMarkers = this.moveMarkers.bind(this);
        this.fillArrayLocationsMarkers = this.fillArrayLocationsMarkers.bind(this);
    }


    creatMap(elementId: string) {
        var mapProp = {
            center: new google.maps.LatLng(this.latCenter, this.lngCenter),
            zoom: this.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        return this.map = new google.maps.Map(document.getElementById(elementId), mapProp);
    }

    onClickMap(callback: (any) => any) {
        return this.map.addListener('click', callback);
    }

    setNewZoomAndEditSettingMarker(changeDistance: number, chooseNumberMarkers: number) {
        if (this.arrayMarkers.length > 0) {
            this.deleteMarkers()
        }
        this.zoom = this.map.getZoom();
        this.radius = Math.pow(2, 22 - this.zoom);
        this.changeDistanceStep = 0
        this.chooseNumberMarkers = chooseNumberMarkers
        this.preparingDataForRenderingMarkers(changeDistance, this.chooseNumberMarkers)
    }

    setMarketMoveSpeed(changeDistance: number, timeOut: number) {
        this.stepCounter = 1;
        this.timeOut = timeOut;
        if (this.changeDistanceStep != 0) {
            changeDistance = changeDistance - this.changeDistanceStep;
        }
        this.changeDistance = changeDistance / this.countMoveStep
    }

    moveMarkers(callback: (any) => any, callbackInfo: (any) => any) {
        this.changeDistanceStep += this.changeDistance;
        this.preparingDataForRenderingMarkers(this.changeDistanceStep, this.chooseNumberMarkers);
        let xMarker = this.lngX;
        let yMarker = this.latY;
        this.animateMove(xMarker, yMarker, this.chooseNumberMarkers)
        this.ref.tick()
        if (this.stepCounter != this.countMoveStep) {
            this.stepCounter++;
            setTimeout(this.moveMarkers, this.timeOut, callback, callbackInfo)
        }
        else {
            let distance = this.getDistance()
            callback(distance);
            this.fillArrayLocationsMarkers(callbackInfo, 0)
        }

    }

    addMarkers(chooseNumberMarkers: number) {
        let xMarker = this.lngX;
        let yMarker = this.latY;
        this.setSettingsForAddMarker(xMarker, yMarker, chooseNumberMarkers)
    }

    setSettingsForAddMarker(xMarker: number, yMarker: number, chooseNumberMarkers: number) {
        let marker;
        this.labelIndex = 1;
        let that = this;
        for (let i = 0; i < chooseNumberMarkers; i++) {
            xMarker = xMarker + this.lngstep;
            yMarker = this.latY;
            for (let j = 0; j < chooseNumberMarkers; j++) {
                yMarker = yMarker + this.latstep
                marker = new google.maps.Marker({
                    position: { lat: yMarker, lng: xMarker },
                    label: '' + this.labelIndex,
                    map: this.map,
                    infowindow: '',
                })
                this.arrayMarkers.push(marker)
                this.labelIndex++;
            }
        }
    }

    animateMove(xMarker: number, yMarker: number, chooseNumberMarkers: number) {
        let marker;
        let indexMarker = 0;
        for (let i = 0; i < chooseNumberMarkers; i++) {
            xMarker = xMarker + this.lngstep;
            yMarker = this.latY;
            for (let j = 0; j < chooseNumberMarkers; j++) {
                yMarker = yMarker + this.latstep
                this.arrayMarkers[indexMarker].setPosition({ lat: yMarker, lng: xMarker })
                indexMarker++
            }
        }

    }

    setMapOnAll(map) {
        for (var i = 0; i < this.arrayMarkers.length; i++) {
            this.arrayMarkers[i].setMap(map);
        }
    }

    clearMarkers() {
        this.setMapOnAll(null);
    }

    deleteMarkers() {
        this.clearMarkers();
        this.arrayMarkers = [];
    }

    preparingDataForRenderingMarkers(changeDistance: number, chooseNumberMarkers: number) {
        this.latDistance = defaultLat * Math.pow(2, 22 - this.zoom)
        this.lngDistance = defaultLng * Math.pow(2, 22 - this.zoom)
        this.changingDistanceBetweenMarkersOnLat = this.latDistance / 100 * changeDistance;
        this.changingDistanceBetweenMarkersOnLng = this.lngDistance / 100 * changeDistance;
        this.latDistance += this.changingDistanceBetweenMarkersOnLat;
        this.lngDistance += this.changingDistanceBetweenMarkersOnLng;

        this.latstep = (this.latDistance * 2 / (chooseNumberMarkers + 1))
        this.lngstep = (this.lngDistance * 2 / (chooseNumberMarkers + 1))

        this.latY = this.lat - this.latDistance;
        this.lngX = this.lng - this.lngDistance;
    }

    setMarker(map, marker, location): any {
        if (marker) {
            marker.setMap(null);
        }
        return marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });
    }

    getLengthArray(): any {
        return { arrayMarkers: this.arrayMarkers.length };
    }

    setLatLng(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }

    getDistance(): number {
        let latlngafte = new google.maps.LatLng(this.arrayMarkers[0].getPosition().lat(), this.arrayMarkers[0].getPosition().lng())
        let latlngbefore = new google.maps.LatLng(this.arrayMarkers[1].getPosition().lat(), this.arrayMarkers[1].getPosition().lng())
        return google.maps.geometry.spherical.computeDistanceBetween(
            latlngafte,
            latlngbefore
        )
    }

    fillArrayLocationsMarkers(callback: (array) => any, startSettingSerialNumber) {
        let geocoder = new google.maps.Geocoder;
        let that = this;
        this.serialNumber = startSettingSerialNumber;

        geocoder.geocode({ location: this.arrayMarkers[this.index].getPosition() }, function (results, status) {
            if (status === 'OK') {
                that.elementInfoMarker = { no: that.serialNumber, location: results[0].formatted_address, coordinates: 'lat: ' + that.arrayMarkers[that.index].getPosition().lat() + " lng: " + that.arrayMarkers[that.index].getPosition().lng() }
                callback(that.elementInfoMarker)
                that.attachMessage(that.arrayMarkers[that.serialNumber - 1], results[0].formatted_address);
                // that.infowindow.open(that.map, that.arrayMarkers[that.serialNumber - 1]);
            }
        });
        if (this.index != this.arrayMarkers.length - 1) {
            this.index++;
            this.serialNumber++;
            setTimeout(this.fillArrayLocationsMarkers, 1800, callback, this.serialNumber);
        }
        else {
            this.serialNumber++;
            this.index = 0;
        }
    }

    attachMessage(marker, Message) {
        var infowindow = new google.maps.InfoWindow({
            content: Message
        });

        marker.addListener('click', function () {
            infowindow.open(marker.get('map'), marker);
        });
    }
}




