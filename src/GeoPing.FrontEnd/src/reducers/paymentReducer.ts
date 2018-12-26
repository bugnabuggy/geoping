import IPaymentStateType from '../types/stateTypes/paymentStateType';
import { paymentState } from '../state/paymentState';
import { GET_PAYMENT_YANDEX_URL, LOAD_PRODUCTS_LIST, SELECT_COMMODITIES } from '../constantsForReducer/payment';

export default function paymentReducer( state: IPaymentStateType = paymentState, action: any ) {
  const reduceObject: any = {
    [ GET_PAYMENT_YANDEX_URL ]: yandexPaymentURL,
    [ LOAD_PRODUCTS_LIST ]: getProducts,
    [ SELECT_COMMODITIES ]: selectCommodities,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function yandexPaymentURL( state: IPaymentStateType, action: any ): IPaymentStateType {
  return {
    ...state,
    yandexPaymentURL: action.yandexURL,
  };
}

function getProducts( state: IPaymentStateType, action: any ): IPaymentStateType {
  return {
    ...state,
    listProducts: action.listProducts,
  };
}

function selectCommodities( state: IPaymentStateType, action: any ): IPaymentStateType {
  return {
    ...state,
    selectCommodityId: action.commodityId,
  };
}
