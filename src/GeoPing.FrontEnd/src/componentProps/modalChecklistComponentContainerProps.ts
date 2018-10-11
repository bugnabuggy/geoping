import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IModalChecklistComponentContainerProps {
  showModal: boolean;
  show: boolean;
  idChecklist: string;

  closeFilterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  createCheckList: ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => void;
  closeModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
}