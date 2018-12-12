import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IModalFilterHistoryComponentProps {
  show: boolean;
  closeFilterHistory: () => void;
  // filterHistory: ( filter: any ) => ( dispatch: IDispatchFunction ) => void;
  loadHistory: ( filter?: any ) => ( dispatch: IDispatchFunction ) => void;
}
