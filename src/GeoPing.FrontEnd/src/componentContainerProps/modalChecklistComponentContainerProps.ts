import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IModalChecklistComponentContainerProps {
  showModal: boolean;
  idChecklist: string;

  createCheckList: ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => void;
  // openModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
  closeModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
}