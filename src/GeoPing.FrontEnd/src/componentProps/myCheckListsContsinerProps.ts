import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IMyCheckListsContsinerProps {
  checkLists: Array<ICheckLists>;

  showModalShare: () => ( dispatch: IDispatchFunction ) => void;
}

export interface ICheckLists {
  name: string;
}