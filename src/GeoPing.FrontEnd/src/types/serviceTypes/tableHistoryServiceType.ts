import IHistoryDataDTO from '../../DTO/historyDataDTO';

export default interface ITableHistoryService {
  getHistory: ( filter?: any ) => Promise<any>;
  addRecordForHistory: ( idUser: string, historyData: IHistoryDataDTO ) => Promise<any>;
}
