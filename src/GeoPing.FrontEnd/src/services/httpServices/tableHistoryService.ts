import ITableHistoryService from '../../types/serviceTypes/tableHistoryServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import IHistoryDataDTO from '../../DTO/historyDataDTO';

export default class TableHistoryService implements ITableHistoryService {
  private communicator: IHttpCommunicator;
  constructor() {
    this.communicator = StaticStorage.serviceLocator.get('IHttpCommunicator');
  }

  getHistory() {
    // return this.communicator.get('#');
    return new Promise( resolve => '' );
  }

  addRecordForHistory( idUser: string, historyData: IHistoryDataDTO ) {
    return new Promise( resolve => '' );
  }
}
