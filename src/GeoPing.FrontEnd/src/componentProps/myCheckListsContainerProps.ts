import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IMyCheckListsContainerProps {
  checkLists: Array<ICheckLists>;

  filterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  showModalShare: ( checkListId: string ) => ( dispatch: IDispatchFunction ) => void;
  openModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
  loadCheckLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  deleteCheckList: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
}

export interface ICheckLists {
  name: string;
}