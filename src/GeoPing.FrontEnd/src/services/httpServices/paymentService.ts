import IPaymentServiceType from '../../types/serviceTypes/paymentServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import { getCommoditiesList, paymentYandexCheckout } from '../../constants/endpoints';
import { getDataFromResponse } from '../helper';

export default class PaymentService implements IPaymentServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  yandexCheckout( commoditiesId: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      const payment = {
        commodityId: commoditiesId,
        amount: 1,
      };
      this.communicator.post( paymentYandexCheckout, payment )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getCommoditiesList() {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get(getCommoditiesList)
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    });
  }

}
