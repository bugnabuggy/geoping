import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IMyCheckListsContainerProps {
  checkLists: Array<ICheckLists>;

  filterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  showModalShare: () => ( dispatch: IDispatchFunction ) => void;
  openModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
}

export interface ICheckLists {
  name: string;
}