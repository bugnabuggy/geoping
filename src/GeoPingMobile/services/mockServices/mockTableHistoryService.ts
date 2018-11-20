import ITableHistoryService from '../../types/serviceTypes/tableHistoryServiceType';
import IHistoryDataDTO from '../../DTO/historyDataDTO';

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

  addRecordForHistory( idUser: string, historyData: IHistoryDataDTO ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          let localDB: any = JSON.parse( sessionStorage.getItem( 'localDB' ) );
          localDB.dashboard_history_table = [
            ...localDB.dashboard_history_table,
            historyData
          ];
          sessionStorage.setItem( 'localDB', JSON.stringify( localDB ) );
          resolve( 'ok' );
        },
        1000
      );
    } );
  }

}
