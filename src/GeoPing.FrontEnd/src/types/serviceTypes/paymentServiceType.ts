export default interface IPaymentServiceType {
  yandexCheckout: ( commoditiesId: string ) => Promise<any>;
  getCommoditiesList: () => Promise<any>;
  sendPaymentDataPayPal: ( token: string, payerId: string ) => Promise<any>;
  paypalCheckout: ( commoditiesId: string ) => Promise<any>;
}