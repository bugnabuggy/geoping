import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import StaticStorage from '../services/staticStorage';
import IPaymentServiceType from '../types/serviceTypes/paymentServiceType';
import { GET_PAYMENT_YANDEX_URL, LOAD_PRODUCTS_LIST, SELECT_COMMODITIES } from '../constantsForReducer/payment';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { windowBlockingAction } from './windowAction';
import { IProductType } from '../types/stateTypes/paymentStateType';

export const paymentYandexCheckout = ( commoditiesId: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( windowBlockingAction( true ) );
  const paymentService: IPaymentServiceType = StaticStorage.serviceLocator.get( 'IPaymentServiceType' );
  paymentService.yandexCheckout( commoditiesId )
    .then( ( resp: any ) => {
      dispatch( paymentYandexCheckoutAction( resp ) );
      dispatch( windowBlockingAction( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' paymentYandexCheckout', EnumNotificationType.Danger )
      ) );
      dispatch( windowBlockingAction( false ) );
    } );
};

export const loadCommoditiesList = () => ( dispatch: IDispatchFunction ) => {
  const paymentService: IPaymentServiceType = StaticStorage.serviceLocator.get( 'IPaymentServiceType' );
  paymentService.getCommoditiesList()
    .then( ( listProducts: Array<IProductType> ) => {
      dispatch( loadCommoditiesListAction( listProducts ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' paymentYandexCheckout', EnumNotificationType.Danger )
      ) );
      dispatch( windowBlockingAction( false ) );
    } );
};

export const selectCommodities = ( commodityId: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( selectCommoditiesAction( commodityId ) );
};

/* Actions */
function paymentYandexCheckoutAction( yandexURL: string ) {
  return { type: GET_PAYMENT_YANDEX_URL, yandexURL };
}

function loadCommoditiesListAction( listProducts: Array<IProductType> ) {
  return { type: LOAD_PRODUCTS_LIST, listProducts };
}

function selectCommoditiesAction( commodityId: string ) {
  return { type: SELECT_COMMODITIES, commodityId };
}
