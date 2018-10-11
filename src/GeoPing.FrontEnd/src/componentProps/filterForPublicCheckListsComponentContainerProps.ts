import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IFilterForPublicCheckListsComponentContainerProps {
  filterName: string;
  filterUser: string;
  filterSubscribers: number;

  changeFilter: ( nameFilter: string, value: string | number ) => ( dispatch: IDispatchFunction ) => void;
  filterPublicCheckLists: ( filters: any ) => ( dispatch: IDispatchFunction ) => void;
}