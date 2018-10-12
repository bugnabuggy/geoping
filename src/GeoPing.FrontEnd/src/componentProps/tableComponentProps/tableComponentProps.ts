export default interface ITableComponentProps {
  striped?: boolean;
  bordered?: boolean;
  condensed?: boolean;
  hover?: boolean;
  responsive?: boolean;
  tableHeaderColumn: Array<ITableStructure>;
}

export interface ITableStructure {
  field: string;
  label: string;
  data: any;

  filtered?: boolean;
  dataSort?: boolean;
}