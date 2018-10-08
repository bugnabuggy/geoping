import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IMyCheckListsContainerProps {
  checkLists: Array<ICheckLists>;

  showModalShare: () => ( dispatch: IDispatchFunction ) => void;
  openModalForCreateCheckList: () => ( dispatch: IDispatchFunction ) => void;
}

export interface ICheckLists {
  name: string;
}