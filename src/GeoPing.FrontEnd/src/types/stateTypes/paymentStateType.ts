export interface IProductType {
  id: string;
  cost: string;
  name: string;
  quantity: number;
}
export default interface IPaymentStateType {
  yandexPaymentURL: string;
  listProducts: Array<IProductType>;
  selectCommodityId: string;
}