import axios, { AxiosRequestConfig } from 'axios';
import IHttpCommunicator from '../types/serviceTypes/httpCommunicatorType';
import { AsyncStorage } from "react-native";

export const get = ( url: string ) => {
  return axios.get ( url );
};

export const post = ( url: string, data: any ) => {
  return axios.post ( url, data );
};

export default class HttpCommunicator implements IHttpCommunicator {
  private accessToken: any;
  private config: AxiosRequestConfig;

  constructor( _config: AxiosRequestConfig = {} ) {
    // this.accessToken = AsyncStorage.getItem( 'token' ) || '';
    AsyncStorage.getItem ( 'token' )
      .then ( ( token: string ) => {
        this.accessToken = token;
      } )
      .catch ( ( error: any ) => {
        this.accessToken = '';
      } );
    this.config = _config;
  }

  createHeader() {
    return new Promise ( ( resolve: any, reject: any ) => {
      let Authorization: string = '';
      AsyncStorage.getItem ( 'token_type' )
        .then ( ( tokenType: string ) => {
          Authorization += tokenType;
          return AsyncStorage.getItem ( 'token' )
        } )
        .then ( ( token: string ) => {
          Authorization += ' ' + token;
          resolve ( {
            ...this.config,
            headers: {
              Authorization: Authorization,
            }
          } )
        } )
        .catch ( ( error: any ) => {
          Authorization = '';
          resolve ( {
            ...this.config,
            headers: {
              Authorization: Authorization,
            }
          } );
        } );
    } )
  }

  delete( url: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.createHeader()
        .then( ( header: any ) => {
          resolve(axios.delete ( url, header ));
        });
    });
  }

  get( url: string ) {
    // return axios.get ( url, this.createHeader () );
    return new Promise( ( resolve: any, reject: any ) => {
      this.createHeader()
        .then( ( header: any ) => {
          resolve(axios.get ( url, header ));
        });
    });
  }

  post( url: string, data: any ) {
    // return axios.post ( url, data, this.createHeader () );
    return new Promise( ( resolve: any, reject: any ) => {
      this.createHeader()
        .then( ( header: any ) => {
          resolve(axios.post ( url, data, header ));
        });
    });
  }

  put( url: string, data: any ) {
    // return axios.put ( url, data, this.createHeader () );
    return new Promise( ( resolve: any, reject: any ) => {
      this.createHeader()
        .then( ( header: any ) => {
          resolve(axios.put ( url, data, header ));
        });
    });
  }

}