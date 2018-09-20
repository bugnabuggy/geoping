import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IPaginationComponentProps {
  countPage: number;
  activePage: number;
  disablePage: number;
  numberAdditionalPages: number;

  changePagination: ( numberPage: string ) => ( dispatch: IDispatchFunction ) => void;
}