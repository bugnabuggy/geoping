import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IAllChecklistsFilterComponentContainerProps {
  changeFields: ( field: string, value: string ) => ( dispatch: IDispatchFunction ) => void;
}