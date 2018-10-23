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

  delete( url: string ) {
    return axios.delete( url, this.config );
  }

  get( url: string ) {
    return axios.get( url, this.config );
  }

  post( url: string, data: any ) {
    return axios.post( url, data, this.config );
  }

  put( url: string, data: any ) {
    return axios.put( url, data, this.config );
  }

}