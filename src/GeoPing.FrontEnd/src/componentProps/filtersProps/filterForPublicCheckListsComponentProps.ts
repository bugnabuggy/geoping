import IDispatchFunction from '../../DTO/types/dispatchFunction';

export default interface IFilterForPublicCheckListsComponentProps {
  changeFilter: ( nameFilter: string, value: string ) => ( dispatch: IDispatchFunction ) => void;
}