export interface ITableHistoryStateType {
  history: Array<ITableHistoryType>;
  showHistoryFilter: boolean;
  isLoading: boolean;
}

export interface ITableHistoryType {
  dateTime: string;
  latLng: string;
  checkList: string;
  apporxAddress: string;
}