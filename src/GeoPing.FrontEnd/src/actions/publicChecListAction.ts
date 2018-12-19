import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  PUBLIC_LIST_CHANGE_FILTER,
  PUBLIC_LIST_CHANGE_PAGINATION,
  PUBLIC_LIST_LOAD_INFO,
  PUBLIC_LIST_LOAD_LISTS
} from '../constantsForReducer/publicCheckList';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { windowBlocking } from './windowAction';
import { IGeoListPublickDTO } from '../DTO/geoListDTO';
import { addListPointsAction } from './googleMapAction';
import IGeoPoint from '../DTO/geoPointDTO';
import IMarkerServiceType from '../types/serviceTypes/markerServiceType';

export const changeFilter = ( nameFilter: string, value: string | number ) => ( dispatch: IDispatchFunction ) => {
  dispatch( changeFilterAction( { nameFilter, value } ) );
};

export const changePagination = ( numberPage: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( changePaginationAction( numberPage ) );
};

export const loadPublicLists = () => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadPublicCheckLists()
    .then( ( response: any ) => {
      dispatch( loadListsAction( response ) );
      windowBlocking( false )( dispatch );
    } )
    .catch( ( error: any ) => {
      try {
        dispatch( addNotificationAction(
          createNotification( error.message + ' loadPublicLists', EnumNotificationType.Danger )
        ) );
      } catch ( e ) {
        dispatch( addNotificationAction( createNotification( 'Error loading lists', EnumNotificationType.Danger ) ) );
      } finally {
        windowBlocking( false )( dispatch );
      }
    } );
};

export const filterPublicCheckLists = ( filters: any ) => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.filterPublicCheckList( filters )
    .then( ( response: any ) => {
      dispatch( loadListsAction( response ) );
      windowBlocking( false )( dispatch );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' filterPublicCheckLists', EnumNotificationType.Danger )
      ) );
      windowBlocking( false )( dispatch );
    } );
};

export const loadPublicCheckListInfo = ( listId: string ) => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
  checkListService.getCertainPublicList( listId )
    .then( ( listInfo: IGeoListPublickDTO ) => {
      dispatch( loadPublicCheckListInfoAction( listInfo ) );
      return markerService.getPointsForPublicList( listId );
    } )
    .then( ( geoPoints: Array<IGeoPoint> ) => {
      dispatch( addListPointsAction( geoPoints ) );
      windowBlocking( false )( dispatch );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' loadPublicCheckListInfo', EnumNotificationType.Danger )
      ) );
      windowBlocking( false )( dispatch );
    } );
};

/* Action */
function changeFilterAction( filter: any ): Object {
  return { type: PUBLIC_LIST_CHANGE_FILTER, filter };
}

function changePaginationAction( numberPage: string ): Object {
  return { type: PUBLIC_LIST_CHANGE_PAGINATION, numberPage };
}

function loadListsAction( lists: any ): Object {
  return { type: PUBLIC_LIST_LOAD_LISTS, lists };
}

function loadPublicCheckListInfoAction( listInfo: IGeoListPublickDTO ) {
  return { type: PUBLIC_LIST_LOAD_INFO, listInfo };
}
