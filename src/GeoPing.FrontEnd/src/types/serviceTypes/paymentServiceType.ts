export default interface IPaymentServiceType {
  yandexCheckout: ( commoditiesId: string ) => Promise<any>;
  getCommoditiesList: () => Promise<any>;
}