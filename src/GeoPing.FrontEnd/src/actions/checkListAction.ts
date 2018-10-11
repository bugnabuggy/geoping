import { v4 as uuidV4 } from 'uuid';

import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  CHANGE_NAME_CHECK_LIST,
  CLOSE_MODAL_FOR_CREATE_CHECK_LIST,
  CREATE_CHECK_LIST,
  EDITING_PERMISSION_POINT,
  MODAL_PERIOD_OPEN_CLOSE,
  OPEN_MODAL_FOR_CREATE_CHECK_LIST
} from '../constantsForReducer/checkList';
import { FILTER_CHECKLIST_LIST, CLOSE_FILTER_CHECKLIST } from '../DTO/constantsForReducer/filters';
import  { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { addNotificationAction } from './notificationsAction';
import { getLocationAddress } from '../services/httpMapService';
import { addPointAction } from './googleMapAction';
import { IMarker } from '../DTO/types/googleMapType';
import StaticStorage from '../services/staticStorage';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';

export const checkGEOPosition = () => ( dispatch: IDispatchFunction ) => {
  window.navigator.geolocation.getCurrentPosition(
    ( location: any ) => {
      getLocationAddress( location.coords.latitude, location.coords.longitude )
        .then( ( response: any ) => {
          const marker: IMarker = {
            id: uuidV4(),
            idList: '',
            name: '',
            radius: 0,
            description: response.data.results[ 0 ].formatted_address,
            lat: Number( location.coords.latitude ),
            lng: Number( location.coords.longitude ),
          };

          dispatch( addPointAction( marker ) );
        } )
        .catch( ( error: any ) => {
          dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
        } );
    },
    ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const createCheckList = ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.createMyCheckList( nameChecklist )
    .then( ( checkList: any ) => {
      dispatch( createCheckListAction( checkList ) );
      dispatch( addNotificationAction( createNotification( 'Check List creating', EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};
export const filterCheckLists = () => (dispatch: IDispatchFunction) => {
  dashboardFiltersMockService('filterCheckLists')
    .then(() => {
      dispatch( filterCheckListsAction(true ));
    })
    .catch(( error: any) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    });
};
export const closeFilterCheckLists = () => (dispatch: IDispatchFunction) => {
  dispatch(closeFilterCheckListsAction( false ) );
};
export const updateNameCheckList = ( newNameCheckList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.updateNameMyCheckList( newNameCheckList )
    .then( ( response: any ) => {
      dispatch( changeNameCheckListAction( response ) );
      dispatch( addNotificationAction( createNotification( 'List name changed', EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const openModalForCreateCheckList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( openModalForCreateCheckListAction( true ) );
};

export const closeModalForCreateCheckList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( closeModalForCreateCheckListAction( false ) );
};

export const editingPermission = ( isEditing: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( editingPermissionAction( isEditing ) );
};

export const changeNameCheckList = ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( changeNameCheckListAction( nameChecklist ) );
};

export const modalPeriodOpenClose = ( isState: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( modalPeriodOpenCloseAction( isState ) );
};

/* Actions */

function createCheckListAction( checklist: any ): Object {
  return { type: CREATE_CHECK_LIST, checklist };
}

function openModalForCreateCheckListAction( isShow: boolean ): Object {
  return { type: OPEN_MODAL_FOR_CREATE_CHECK_LIST, isShow };
}

function closeModalForCreateCheckListAction( isClose: boolean ): Object {
  return { type: CLOSE_MODAL_FOR_CREATE_CHECK_LIST, isClose };
}

function editingPermissionAction( isEditing: boolean ): Object {
  return { type: EDITING_PERMISSION_POINT, isEditing };
}

function changeNameCheckListAction( nameChecklist: string ): Object {
  return { type: CHANGE_NAME_CHECK_LIST, nameChecklist };
}

function modalPeriodOpenCloseAction( isState: boolean ): Object {
  return { type: MODAL_PERIOD_OPEN_CLOSE, isState };
}
function filterCheckListsAction(isShow: boolean): Object {
  return { type: FILTER_CHECKLIST_LIST, isShow };
}
function closeFilterCheckListsAction(isShow: boolean): Object {
  return { type: CLOSE_FILTER_CHECKLIST, isShow };
}