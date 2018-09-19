import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IShareCheckListModalComponentContainerProps {
  show: boolean;

  closeModalShare: () => ( dispatch: IDispatchFunction ) => void;
}