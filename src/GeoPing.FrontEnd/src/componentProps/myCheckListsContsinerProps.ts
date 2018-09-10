export default interface IMyCheckListsContsinerProps {
  checkLists: Array<ICheckLists>;

  showModalShare: () => ( dispatcj: Function ) => void;
}

export interface ICheckLists {
  name: string;
}