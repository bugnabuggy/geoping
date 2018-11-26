import axios from 'axios';
import { getAllGeoLists, getToken } from "../constants/endpoints";
import { getDataFromResponse } from "./helper";

export default class LoginHttpService {
  login( data: any ) {
    return new Promise<any> ( ( resolve: any, reject: any ) => {
      axios.post( getToken, data )
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
      axios.get(getAllGeoLists, {
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