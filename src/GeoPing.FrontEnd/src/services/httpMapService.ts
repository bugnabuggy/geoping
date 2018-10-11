import IHttpCommunicator from '../DTO/httpCommunicatorType';
import HttpCommunicator from './httpService';

export function getLocationAddress( lat: number, lng: number ) {
  const communicator: IHttpCommunicator = new HttpCommunicator();
  const latLong: string = lat + ',' + lng;
  return communicator.get( 'https://maps.googleapis.com/maps/api/geocode/json' +
    `?latlng=${latLong}&key=${process.env.REACT_APP_GOOGLE_API_KEY}` );
}