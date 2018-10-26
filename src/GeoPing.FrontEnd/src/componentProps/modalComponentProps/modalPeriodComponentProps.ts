import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IModalPeriodComponentProps {
  isShowModal: boolean;

  modalPeriodOpenClose: ( isState: boolean ) => ( dispatch: IDispatchFunction ) => void;
}