import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IMyCheckListsStateType from '../types/stateTypes/myCheckListsStateType';
import IGeoListType from '../DTO/geoListDTO';
import ICheckListStateType from '../types/stateTypes/checkListStateType';

export default interface IMyCheckListsContainerProps {
  myCheckList: IMyCheckListsStateType;
  checkLists: Array<IGeoListType>;

  filterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  showModalShare: ( checkListId: string ) => ( dispatch: IDispatchFunction ) => void;
  openModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
  loadCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  deleteCheckList: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  clearStateMyCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  selectCheckList: ( checkList: IGeoListType ) => ( dispatch: IDispatchFunction ) => void;
}
