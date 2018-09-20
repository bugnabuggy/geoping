import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ICheckListTitleComponentContainerProps {
  nameChecklist: string;

  changeNameCheckList: ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => void;
}