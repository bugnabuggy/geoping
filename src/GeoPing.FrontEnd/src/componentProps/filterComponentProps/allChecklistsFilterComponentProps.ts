import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IAllChecklistsFilterComponentProps {
  changeFields: ( field: string, value: string ) => ( dispatch: IDispatchFunction ) => void;
}