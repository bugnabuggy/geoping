import IDispatchFunction from '../DTO/types/dispatchFunction';
import serviceLocator from '../services/serviceLocator';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';
import { DELETE_MY_CHECK_LISTS, LOAD_MY_CHECK_LISTS } from '../DTO/constantsForReducer/checkList';
import { CLOSE_MODAL_SHARE, SHOW_MODAL_SHARE } from '../DTO/constantsForReducer/modal';

export const loadCheckLists = () => ( dispatch: IDispatchFunction ) => {
  serviceLocator.get( 'load_lists' )
    .then( ( checkLists: any ) => {
      dispatch( loadCheckListsAction( checkLists ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const addCheckList = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const deleteCheckList = ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => {
  serviceLocator.post( 'delete_my_check_list', idCheckList )
    .then( ( checkLists: any ) => {
      // console.log( 'checkLists', checkLists );
      dispatch( deleteCheckListAction( idCheckList ) );
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