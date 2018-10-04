import IDispatchFunction from '../../DTO/types/dispatchFunction';

export default interface IModalPeriodComponentProps {
  isShowModal: boolean;

  modalPeriodOpenClose: ( isState: boolean ) => ( dispatch: IDispatchFunction ) => void;
}