import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IFilterPaymentContainerProps {
  changeFilterField: ( field: string, data: string|number|Date ) => ( dispatch: IDispatchFunction ) => void;
}