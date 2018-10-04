import IDispatchFunction from '../../DTO/types/dispatchFunction';

export default interface IAllChecklistsFilterComponentProps {
  changeFields: ( field: string, value: string ) => ( dispatch: IDispatchFunction ) => void;
}