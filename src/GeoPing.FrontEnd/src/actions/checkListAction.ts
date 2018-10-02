import { v4 as uuidV4 } from 'uuid';

import IDispatchFunction from '../DTO/types/dispatchFunction';
import {
  CHANGE_NAME_CHECK_LIST,
  CLOSE_MODAL_FOR_CREATE_CHECK_LIST,
  CREATE_CHECK_LIST,
  EDITING_PERMISSION_POINT,
  MODAL_PERIOD_OPEN_CLOSE,
  OPEN_MODAL_FOR_CREATE_CHECK_LIST
} from '../DTO/constantsForReducer/checkList';
import { createCheckListMockService } from '../services/mockServices/createCheckListMockService';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';
import { addNotificationAction } from './notificationsAction';
import { getLocationAddress } from '../services/mapService';
import { addPointAction } from './googleMapAction';
import { IMarker } from '../DTO/types/googleMapType';

export const checkGEOPosition = () => ( dispatch: IDispatchFunction ) => {
  window.navigator.geolocation.getCurrentPosition(
    ( location: any ) => {
      getLocationAddress( location.coords.latitude, location.coords.longitude )
        .then( ( response: any ) => {
          const marker: IMarker = {
            id: uuidV4(),
            name: '',
            radius: 0,
            description: response.data.results[ 0 ].formatted_address,
            lat: Number( location.coords.latitude ),
            lng: Number( location.coords.longitude ),
          };

          dispatch( addPointAction( marker ) );
        } )
        .catch( ( error: any ) => {
          dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Warning ) ) );
        } );
    },
    ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Warning ) ) );
    } );
};

export const loadGEOPointsList = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const deleteGEOPoint = ( idGEOPoint: number ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const loadCheckList = ( idCheckList: number ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const createCheckList = ( nameChecklist: string ) => ( dispatch: IDispatchFunction ) => {
  createCheckListMockService( nameChecklist )
    .then( ( checkList: any ) => {
      dispatch( createCheckListAction( checkList ) );
      dispatch( addNotificationAction( createNotification( 'Check List creating', EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Warning ) ) );
    } );
};

export const openModalForCreateCheckList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( openModalForCreateCheckListAction( true ) );
};

export const closeModalForCreateCheckList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( closeModalForCreateCheckListAction( false ) );
};

export const editingPermission = ( isEditind: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( editingPermissionAction( isEditind ) );
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

function editingPermissionAction( isEditind: boolean ): Object {
  return { type: EDITING_PERMISSION_POINT, isEditind };
}

function changeNameCheckListAction( nameChecklist: string ): Object {
  return { type: CHANGE_NAME_CHECK_LIST, nameChecklist };
}

function modalPeriodOpenCloseAction( isState: boolean ): Object {
  return { type: MODAL_PERIOD_OPEN_CLOSE, isState };
}