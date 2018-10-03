import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ICheckListHeadComponentProps {
  nameChecklist: string;

  changeNameCheckList: ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => void;
  modalPeriodOpenClose: ( isState: boolean ) => ( dispatch: IDispatchFunction ) => void;
}