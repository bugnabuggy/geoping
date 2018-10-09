import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IModalChecklistComponentContainerProps {
  showModal: boolean;
  idChecklist: number;
  show: boolean;

  closeFilterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  createCheckList: ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => void;
  closeModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
}