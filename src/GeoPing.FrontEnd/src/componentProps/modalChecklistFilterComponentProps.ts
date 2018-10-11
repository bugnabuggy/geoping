import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IModalChecklistFilterComponentProps {
  show: boolean;

  closeFilterCheckLists: () => ( dispatch: IDispatchFunction ) => void;
}