import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';
import ICheckListStateType from '../../types/stateTypes/checkListStateType';

export default interface IModalPeriodComponentProps {
  checkList: ICheckListStateType;

  modalPeriodOpenClose: ( isState: boolean ) => ( dispatch: IDispatchFunction ) => void;
}