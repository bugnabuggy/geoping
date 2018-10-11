import ITableHistoryService from '../../DTO/tableHistoryServiceType';
import IHttpCommunicator from '../../DTO/httpCommunicatorType';
import StaticStorage from '../staticStorage';

export default class TableHistoryService implements ITableHistoryService {
  private communicator: IHttpCommunicator;
  constructor() {
    this.communicator = StaticStorage.serviceLocator.get('IHttpCommunicator');
  }

  getHistory() {
    return this.communicator.get('ffffd');
  }
}
