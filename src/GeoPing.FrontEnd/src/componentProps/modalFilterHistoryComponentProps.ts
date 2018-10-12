import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IModalFilterHistoryComponentProps {
  show: boolean;
  closeFilterHistory: () => ( dispatch: IDispatchFunction ) => void;
}
