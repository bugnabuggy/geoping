import ITableHistoryService from '../../types/serviceTypes/tableHistoryServiceType';

export default class MockTableHistoryService implements ITableHistoryService {
  getHistory() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( JSON.parse( sessionStorage.getItem( 'localDB' ) ).dashboard_history_table || [] );
        },
        1000
      );
    } );
  }
}
