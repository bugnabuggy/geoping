export interface ITableHistoryStateType {
  history: Array<ITableHistoryType>;
}

export interface ITableHistoryType {
  dateTime: string;
  latLng: string;
  checkList: string;
  apporxAddress: string;
}