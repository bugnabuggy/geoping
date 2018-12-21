import ITableHistoryService from '../../types/serviceTypes/tableHistoryServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import IHistoryDataDTO from '../../DTO/historyDataDTO';
import { getHistory } from '../../constants/endpoints';
import { getDataFromResponse } from '../helper';

export default class TableHistoryService implements ITableHistoryService {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  getHistory( filter?: any ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get( !!!filter ? getHistory
        :
        `${getHistory}?DatePeriodFrom=${filter.DatePeriodFrom}&DatePeriodTo=${filter.DatePeriodTo}` )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  addRecordForHistory( idUser: string, historyData: IHistoryDataDTO ) {
    return new Promise( resolve => '' );
  }
}
