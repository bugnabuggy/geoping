import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ICheckListTitleComponentContainerProps {
  nameChecklist: string;
  isShowModal: boolean;

  changeNameCheckList: ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => void;
  modalPeriodOpenClose: ( isState: boolean ) => ( dispatch: IDispatchFunction ) => void;
}