import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MapService } from '../services/mapService';
import { MatTableDataSource } from '@angular/material';
import { infoMarker } from '../models/infoMarker';


@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.component.html',
  styleUrls: ['../app.component.css']
})

export class AppComponent implements OnInit {

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
  value: number = 0;

  arrayInfoAboutMarkers: infoMarker[] = [];
  displayedColumns = ['No', 'Coordinates', 'Location'];
  dataSource = new MatTableDataSource<infoMarker>(this.arrayInfoAboutMarkers);;

  constructor(
    private globalRef: ApplicationRef,
    private ref: ChangeDetectorRef,
    private mapService: MapService,
    private snackBar: MatSnackBar
  ) {
    this.setCoordinates = this.setCoordinates.bind(this);
    this.formatDistance = this.formatDistance.bind(this);
    this.fillTable = this.fillTable.bind(this);
  }



  ngOnInit() {
    this.map = this.mapService.creatMap('gmap')
    this.mapService.onClickMap(this.setCoordinates);
  }

  getNumberMarkers(numberMarkers: number) {
    this.chooseNumberMarkers = numberMarkers;
  }

  setMarkers() {
    this.value = 0;
    if (this.lat) {
      this.mapService.setLatLng(this.lat, this.lng)
      this.mapService.setNewZoomAndEditSettingMarker(0, this.chooseNumberMarkers)
      this.mapService.addMarkers(this.chooseNumberMarkers);
      let distance = this.mapService.getDistance();
      this.formatDistance(distance);
      this.arrayInfoAboutMarkers = [];
      this.mapService.fillArrayLocationsMarkers(this.fillTable, 0);
    }
    else {
      this.snackBar.open('put a marker', "OK", {
        panelClass: 'red-snack-bar',
        verticalPosition: 'top',
      });
    }
  }

  changeDistance(changeDistance: number) {
    let mass = this.mapService.getLengthArray();

    if (mass.arrayMarkers != 0) {
      this.mapService.setMarketMoveSpeed(changeDistance, 4)
      this.arrayInfoAboutMarkers = [];
      this.mapService.moveMarkers(this.formatDistance, this.fillTable)
    }
    else {
      this.snackBar.open('set markers', "OK", {
        panelClass: 'red-snack-bar',
        verticalPosition: 'top',
      });
    }
  }

  setCoordinates(event) {
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();
    this.marker = this.mapService.setMarker(this.map, this.marker, event.latLng);
    this.ref.detectChanges();
  }

  formatDistance(distance: number) {
    let distanceMetre = Math.round(distance * 100) / 100
    if (distanceMetre >= 1000) {
      this.distanceValue = Math.round((distanceMetre / 1000) * 100) / 100 + ' Km'
    }
    else {
      this.distanceValue = distanceMetre + ' m'
    }
    this.ref.detectChanges()
  }
  fillTable(array: any) {
    this.arrayInfoAboutMarkers.push(array)
    this.dataSource.data = this.arrayInfoAboutMarkers;
    this.globalRef.tick();
  }

}
