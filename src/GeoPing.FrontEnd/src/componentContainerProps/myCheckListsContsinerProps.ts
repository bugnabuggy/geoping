import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IMyCheckListsContainerProps {
  checkLists: Array<any>;

  showModalShare: ( checkListId: string ) => ( dispatch: IDispatchFunction ) => void;
  openModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
  loadCheckLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  deleteCheckList: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
}

export interface ICheckLists {
  name: string;
}