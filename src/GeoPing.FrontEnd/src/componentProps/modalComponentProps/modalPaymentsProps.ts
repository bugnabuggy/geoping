import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';
import IPaymentStateType from '../../types/stateTypes/paymentStateType';

export default interface IModalPaymentsProps {
  show: boolean;
  payment: IPaymentStateType;

  close: () => void;
  paymentYandexCheckout: ( commoditiesId: string ) => ( dispatch: IDispatchFunction ) => void;
  selectCommodities: ( commodityId: string ) => ( dispatch: IDispatchFunction ) => void;
  paymentPayPalCheckout: ( commoditiesId: string ) => ( dispatch: IDispatchFunction ) => void;
}