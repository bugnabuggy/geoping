import ITableHistoryService from '../../types/serviceTypes/tableHistoryServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import IHistoryDataDTO from '../../DTO/historyDataDTO';
import { endpointBaseUrl } from '../../constants/endpoints';

export default class TableHistoryService implements ITableHistoryService {
  private communicator: IHttpCommunicator;
  constructor() {
    this.communicator = StaticStorage.serviceLocator.get('IHttpCommunicator');
  }

  getHistory() {
    return this.communicator.get(endpointBaseUrl + '/history');
  }

  addRecordForHistory( idUser: string, historyData: IHistoryDataDTO ) {
    return new Promise( resolve => '' );
  }
}
