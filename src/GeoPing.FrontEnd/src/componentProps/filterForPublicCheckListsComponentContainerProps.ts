import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IFilterForPublicCheckListsComponentContainerProps {
  changeFilter: ( nameFilter: string, value: string ) => ( dispatch: IDispatchFunction ) => void;
}