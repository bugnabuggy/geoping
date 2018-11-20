import axios, { AxiosRequestConfig } from 'axios';
import IHttpCommunicator from '../types/serviceTypes/httpCommunicatorType';

export const get = ( url: string ) => {
  return axios.get( url );
};

export const post = ( url: string, data: any ) => {
  return axios.post( url, data );
};

export default class HttpCommunicator implements IHttpCommunicator {
  private accessToken: string;
  private config: AxiosRequestConfig;

  constructor( _config: AxiosRequestConfig = {} ) {
    this.accessToken = localStorage.getItem( 'token' ) || '';
    this.config = _config;
  }

  createHeader() {
    return {
      ...this.config,
      headers: !!localStorage.getItem( 'token' ) ?
        {
          Authorization: localStorage.getItem( 'token_type' ) + ' ' + localStorage.getItem( 'token' ),
        }
        :
        {},
    };
  }

  delete( url: string ) {
    return axios.delete( url, this.createHeader() );
  }

  get( url: string ) {
    return axios.get( url, this.createHeader() );
  }

  post( url: string, data: any ) {
    return axios.post( url, data, this.createHeader() );
  }

  put( url: string, data: any ) {
    return axios.put( url, data, this.createHeader() );
  }

}