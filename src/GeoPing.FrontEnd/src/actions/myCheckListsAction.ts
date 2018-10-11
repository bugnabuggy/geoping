import IDispatchFunction from '../DTO/types/dispatchFunction';
import { DELETE_MY_CHECK_LISTS, LOAD_MY_CHECK_LISTS } from '../DTO/constantsForReducer/checkList';
import { CLOSE_MODAL_SHARE, SHOW_MODAL_SHARE } from '../DTO/constantsForReducer/modal';
import StaticStorage from '../services/staticStorage';
import ICheckListServiceType from '../DTO/checkListServiceType';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export const loadCheckLists = ( idUser: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: any = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadAllMyCheckLists( idUser )
    .then( ( checkLists: any ) => {
      dispatch( loadCheckListsAction( checkLists ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const deleteCheckList = ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: any = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.deleteMyCheckList( idCheckList )
    .then( ( checkLists: any ) => {
      if ( checkLists ) {
        dispatch( deleteCheckListAction( idCheckList ) );
      }
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const showModalShare = ( checkListId: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( showModalShareAction( checkListId ) );
};

export const closeModalShare = () => ( dispatch: IDispatchFunction ) => {
  dispatch( closeModalShareAction( false ) );
};

/* Action */
function showModalShareAction( checkListId: string ): Object {
  return { type: SHOW_MODAL_SHARE, checkListId };
}

function closeModalShareAction( isShow: boolean ): Object {
  return { type: CLOSE_MODAL_SHARE, isShow };
}

function loadCheckListsAction( checklists: Array<any> ): Object {
  return { type: LOAD_MY_CHECK_LISTS, checklists };
}

function deleteCheckListAction( checkListId: string ): Object {
  return { type: DELETE_MY_CHECK_LISTS, checkListId };
}