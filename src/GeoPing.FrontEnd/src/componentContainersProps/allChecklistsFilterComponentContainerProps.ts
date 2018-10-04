import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IAllChecklistsFilterComponentContainerProps {
  changeFields: ( field: string, value: string ) => ( dispatch: IDispatchFunction ) => void;
}