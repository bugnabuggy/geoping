import { get } from './httpService';

export function getLocationAddress( lat: number, lng: number ) {
  const latLong: string = lat + ',' + lng;
  return get( 'https://maps.googleapis.com/maps/api/geocode/json' +
    `?latlng=${latLong}&key=${process.env.REACT_APP_GOOGLE_API_KEY}` );
}