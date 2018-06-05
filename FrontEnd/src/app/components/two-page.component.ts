import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MapService } from '../services/mapService';
import { MatTableDataSource } from '@angular/material';
import { infoMarker } from '../models/infoMarker';
import { NavigationError } from '@angular/router';


declare var google: any;

@Component({
    selector: 'two-page',
    templateUrl: '../templates/two-page.component.html',
    styleUrls: ['../app.component.css']
})

export class TwoPageComponent implements OnInit {
    chooseNumberMarkers: number = 3;
    numberMarkersPerSide: number[] = [3, 4, 5, 6]

    max = 100;
    min = 0;
    step = 1;
    thumbLabel = true;

    distanceValue: string = '0 m';
    lat: number = 0;
    lng: number = 0;
    map: any;
    marker: any;
    value: string;
    arrayMarkers = [];
    location: string;
    indexButton = 0;
    arrayInfoAboutMarkers: any[] = [];

    constructor(
        private globalRef: ApplicationRef,
        private ref: ChangeDetectorRef,
        private mapService: MapService,
        private snackBar: MatSnackBar
    ) {
        this.setCoordinates = this.setCoordinates.bind(this);
        this.addList = this.addList.bind(this);
        this.showLocationMarker = this.showLocationMarker.bind(this)
    }



    ngOnInit() {
        this.map = this.mapService.creatMap('gmap')
        this.mapService.onClickMap(this.setCoordinates);
    }

    setComment(comment) {
        if (this.marker) {
            let latLng = this.marker.getPosition();
            this.marker = null;
            let marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

            });
            this.mapService.attachMessage(marker, comment)
            this.arrayMarkers.push(marker);
            this.getGeocode(comment, marker, this.addList)
            this.value = '';
        }
    }

    setCoordinates(event) {
        this.lat = event.latLng.lat();
        this.lng = event.latLng.lng();
        this.marker = this.mapService.setMarker(this.map, this.marker, event.latLng);
        this.getGeocode("", this.marker, this.showLocationMarker)
        this.ref.detectChanges();
    }

    checkIn(index: any) {
        let that = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                let marker = new google.maps.Marker({
                    position: pos,
                    map: that.map,
                    label: 'Я'
                })
                that.checkingTheLocationNextToTheMarker(that.arrayMarkers[index], marker.getPosition())
                that.globalRef.tick();
            });

        }

    }


    getGeocode(comment: any, marker: any, callback: (any: any, results: any, marker: any) => any) {
        let geocoder = new google.maps.Geocoder;
        let that = this;
        geocoder.geocode({ location: marker.getPosition() }, function (results, status) {
            if (status === 'OK') {
                callback(comment, results, marker)
            }
        });
    }


    showLocationMarker(comment: string, results: any, marker: any) {
        this.location = results[0].formatted_address;
        this.globalRef.tick();
    }

    addList(comment: string, results: any, marker: any) {
        let markerInfo = [
            { text: "comment:" + comment, cols: 5, rows: 1, color: 'white', index: this.indexButton },
            { text: "coordinates: lat: " + marker.getPosition().lat() + " lng: " + marker.getPosition().lng(), cols: 2, rows: 1, color: 'white' },
            { text: "location: " + results[0].formatted_address, cols: 2, rows: 1, color: 'white' },
        ]
        this.indexButton++;
        this.arrayInfoAboutMarkers.push(markerInfo);
        this.globalRef.tick();
    }

    checkingTheLocationNextToTheMarker(locationMarker: any, mylocation: any) {
        let markerLat = Math.abs(locationMarker.getPosition().lat())
        let markerLng = Math.abs(locationMarker.getPosition().lng())
        let distanceLat = Math.abs(Math.abs(markerLat) - Math.abs(mylocation.lat()))
        let distanceLng = Math.abs(Math.abs(markerLng) - Math.abs(mylocation.lng()))
        if ((distanceLat < 0.00009) && (distanceLng < 0.0002)) {

            locationMarker.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png")
        }
        else {
            console.log("not check ")
        }
    }
}

interface dataMarker {
    location: string;
    comment: string;
    coordinates: string;
};