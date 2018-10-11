import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IModalChecklistComponentProps {
  showModal: boolean;

  createCheckList: ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => void;
  // openModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
  closeModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
}