import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  PUBLIC_LIST_CHANGE_FILTER,
  PUBLIC_LIST_CHANGE_PAGINATION,
  PUBLIC_LIST_LOAD_LISTS
} from '../constantsForReducer/publicCheckList';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export const changeFilter = ( nameFilter: string, value: string | number ) => ( dispatch: IDispatchFunction ) => {
  dispatch( changeFilterAction( { nameFilter, value } ) );
};

export const changePagination = ( numberPage: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( changePaginationAction( numberPage ) );
};

export const loadPublicLists = () => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadPublicCheckLists()
    .then( ( response: any ) => {
      dispatch( loadListsAction( [] ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const filterPublicCheckLists = ( filters: any ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.filterPublicCheckList()
    .then( ( response: any ) => {
      dispatch( loadListsAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

/* Action */
function changeFilterAction( filter: any ): Object {
  return { type: PUBLIC_LIST_CHANGE_FILTER, filter };
}

function changePaginationAction( numberPage: string ): Object {
  return { type: PUBLIC_LIST_CHANGE_PAGINATION, numberPage };
}

function loadListsAction( list: any ): Object {
  return { type: PUBLIC_LIST_LOAD_LISTS, list };
}