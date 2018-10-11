import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IShareCheckListModalComponentProps {
  show: boolean;

  closeModalShare: () => ( dispatch: IDispatchFunction ) => void;
}