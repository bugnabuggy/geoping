import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IModalChecklistComponentContainerProps {
  showModal: boolean;
  show: boolean;
  idChecklist: string;
  isRedirect: boolean;

  closeFilterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  createCheckList: ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => void;
  closeModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
}