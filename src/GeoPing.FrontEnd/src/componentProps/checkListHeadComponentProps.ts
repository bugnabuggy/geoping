import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface ICheckListHeadComponentProps {
  nameChecklist: string;

  modalPeriodOpenClose: ( isState: boolean ) => ( dispatch: IDispatchFunction ) => void;
  updateNameCheckList: ( newNameCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
}