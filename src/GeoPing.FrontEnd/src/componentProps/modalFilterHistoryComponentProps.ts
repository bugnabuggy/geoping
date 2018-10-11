import IDispatchFunction from "../DTO/types/dispatchFunction";

export default interface IModalFilterHistoryComponentProps {
  show: boolean;
  closeFilterHistory: () => ( dispatch: IDispatchFunction ) => void;
}
