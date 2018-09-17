import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ICheckListComponentProps {
  name: string;

  showModalShare: () => ( dispatch: IDispatchFunction ) => void;
}