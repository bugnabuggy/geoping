import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IPaymentPayPalContainerProps {
  location: any;

  paymentPayPal: ( token: string, payerId: string ) => ( dispatch: IDispatchFunction ) => void;
}