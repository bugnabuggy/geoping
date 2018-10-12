import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IFilterForPublicCheckListsComponentProps {
  filterName: string;
  filterUser: string;
  filterSubscribers: number;

  changeFilter: ( nameFilter: string, value: string | number ) => ( dispatch: IDispatchFunction ) => void;
  filterPublicCheckLists: ( filters: any ) => ( dispatch: IDispatchFunction ) => void;
}