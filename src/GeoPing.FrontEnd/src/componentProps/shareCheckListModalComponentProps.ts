import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IShareCheckListModalComponentProps {
  show: boolean;

  closeModalShare: () => ( dispatch: IDispatchFunction ) => void;
}