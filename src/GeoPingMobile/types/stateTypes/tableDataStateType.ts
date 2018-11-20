
export default interface ITableDataStateType {
  tableData: Array<ITableData>;
}

export interface ITableData {
  name: string;
  age: number;
  nickname: string;
  employee: boolean;
}