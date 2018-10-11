import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IShareCheckListModalComponentContainerProps {
  show: boolean;

  closeModalShare: () => ( dispatch: IDispatchFunction ) => void;
}