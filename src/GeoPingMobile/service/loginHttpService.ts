import axios from 'axios';
import { getMyGeoListURL, loginUrl } from "../constants/endpoints";
import { getDataFromResponse } from "./helper";

export default class LoginHttpService {
  login( data: any ) {
    return new Promise<any> ( ( resolve: any, reject: any ) => {
      axios.post( loginUrl, data )
        .then( ( response: any ) => {
          resolve(getDataFromResponse(response));
        } )
        .catch( ( error: any ) => {
          reject(error);
        })
    } );
  }

  getMyCheckLists( token: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      axios.get(getMyGeoListURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then( ( response: any ) => {
          resolve(getDataFromResponse(response));
        } )
        .catch( ( error: any ) => {
          reject(error);
        })
    });
  }
}