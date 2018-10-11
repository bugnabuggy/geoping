import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface ICheckListTitleComponentContainerProps {
  nameChecklist: string;
  isShowModal: boolean;

  modalPeriodOpenClose: ( isState: boolean ) => ( dispatch: IDispatchFunction ) => void;
  updateNameCheckList: ( newNameCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
}