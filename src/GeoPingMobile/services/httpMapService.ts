import IHttpCommunicator from '../types/serviceTypes/httpCommunicatorType';
import HttpCommunicator from './httpService';
import Geocoder from 'react-native-geocoder';

export function getLocationAddress( lat: number, lng: number ) {
  const communicator: IHttpCommunicator = new HttpCommunicator();
  const latLong: string = lat + ',' + lng;
  return communicator.get( 'https://maps.googleapis.com/maps/api/geocode/json' +
    `?latlng=${latLong}&key=AIzaSyCl19FjGVGF_hprmIrS8OwHoQc5E2jwxEE` );
}

export function geoCodePosition( lat: number, lng: number ) {
  const latLng = {
    lat,
    lng,
  };
  return Geocoder.geocodePosition(latLng);
}