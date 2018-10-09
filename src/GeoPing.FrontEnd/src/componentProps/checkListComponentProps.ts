import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ICheckListComponentProps {
  checkList: any;

  showModalShare: ( checkListId: string ) => ( dispatch: IDispatchFunction ) => void;
  deleteCheckList: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
}