import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IMyCheckListsStateType from '../types/stateTypes/myCheckListsStateType';

export default interface IMyCheckListsContainerProps {
  myCheckList: IMyCheckListsStateType;

  filterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  showModalShare: ( checkListId: string ) => ( dispatch: IDispatchFunction ) => void;
  openModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
  loadCheckLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  deleteCheckList: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  clearStateMyCheckLists: () => ( dispatch: IDispatchFunction ) => void;
}
