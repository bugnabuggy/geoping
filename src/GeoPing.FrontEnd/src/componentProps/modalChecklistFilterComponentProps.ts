import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IModalChecklistFilterComponentProps {
  show: boolean;

  closeFilterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
}