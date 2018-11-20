import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  CLEAR_STATE_MY_CHECK_LIST,
  DELETE_MY_CHECK_LISTS,
  LOAD_MY_CHECK_LISTS,
  MY_CHECK_LIST_LOADING
} from '../constantsForReducer/checkList';
import { CLOSE_MODAL_SHARE, SHOW_MODAL_SHARE } from '../constantsForReducer/modal';
import StaticStorage from '../services/staticStorage';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import IGeoListType from '../DTO/geoListDTO';

export const loadCheckLists = () => ( dispatch: IDispatchFunction ) => {
  dispatch( loadingAction( true ) );
  const checkListService: any = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadAllMyCheckLists()
    .then( ( checkLists: Array<IGeoListType> ) => {
      dispatch( loadCheckListsAction( checkLists ) );
      dispatch( loadingAction( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
      dispatch( loadingAction( false ) );
    } );
};

export const deleteCheckList = ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: any = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.deleteMyCheckList( idCheckList )
    .then( ( checkLists: any ) => {
      dispatch( addNotificationAction( createNotification(
        'Geolist was successfully removed',
        EnumNotificationType.Success
      ) ) );
      dispatch( deleteCheckListAction( idCheckList ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const showModalShare = ( checkListId: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( showModalShareAction( checkListId ) );
};

export const closeModalShare = () => ( dispatch: IDispatchFunction ) => {
  dispatch( closeModalShareAction( false ) );
};

export const clearStateMyCheckLists = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearStateMyCheckListsAction() );
};

/* Action */
function showModalShareAction( checkListId: string ): Object {
  return { type: SHOW_MODAL_SHARE, checkListId };
}

function closeModalShareAction( isShow: boolean ): Object {
  return { type: CLOSE_MODAL_SHARE, isShow };
}

function loadCheckListsAction( checklists: Array<IGeoListType> ): Object {
  return { type: LOAD_MY_CHECK_LISTS, checklists };
}

function deleteCheckListAction( checkListId: string ): Object {
  return { type: DELETE_MY_CHECK_LISTS, checkListId };
}

function clearStateMyCheckListsAction(): { type: string } {
  return { type: CLEAR_STATE_MY_CHECK_LIST };
}

function loadingAction( loading: boolean ): { type: string, loading: boolean } {
  return { type: MY_CHECK_LIST_LOADING, loading };
}