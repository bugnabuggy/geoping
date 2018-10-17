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
import {
  ADD_GEO_POINT_FROM_MY_POSITION,
  CLEAR_STATE_CHECK_LIST,
  CLOSE_FILTER_CHECKLIST,
  FILTER_CHECKLIST_LIST,
  LOAD_CHECK_LIST_DATA
} from '../constantsForReducer/filters';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { addNotificationAction } from './notificationsAction';
import { getLocationAddress } from '../services/httpMapService';
import StaticStorage from '../services/staticStorage';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import IGeoPoint from '../DTO/geoPointDTO';
import IGeoListType from '../DTO/geoListDTO';
import IMarkerServiceType from '../types/serviceTypes/markerServiceType';
import { addListPointsAction } from './googleMapAction';

export const checkGEOPosition = () => ( dispatch: IDispatchFunction ) => {
  window.navigator.geolocation.getCurrentPosition(
    ( location: any ) => {
      getLocationAddress( location.coords.latitude, location.coords.longitude )
        .then( ( response: any ) => {
          const marker: IGeoPoint = {
            id: uuidV4(),
            idList: '',
            name: '',
            radius: 0,
            description: response.data.results[ 0 ].formatted_address,
            lat: Number( location.coords.latitude ),
            lng: Number( location.coords.longitude ),
          };

          // dispatch( addPointAction( marker ) );
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
export const filterCheckLists = () => ( dispatch: IDispatchFunction ) => {
  dashboardFiltersMockService( 'filterCheckLists' )
    .then( () => {
      dispatch( filterCheckListsAction( true ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};
export const closeFilterCheckLists = () => ( dispatch: IDispatchFunction ) => {
  dispatch( closeFilterCheckListsAction( false ) );
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

export const addNewPointForMyGeoPosition = ( isMyGeoPosition: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( addNewPointForMyGeoPositionAction( isMyGeoPosition ) );
};

export const loadCheckListData = ( idUser: string, idCheckList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
  checkListService.loadMyCheckList( idCheckList )
    .then( ( checkList: any ) => {
      dispatch( loadCheckListDataAction( checkList ) );
      return markerService.getAllMarkersForCheckList( idCheckList );
    } )
    .then( ( geoPoints: Array<IGeoPoint> ) => {
      dispatch( addListPointsAction( geoPoints ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const clearStateCheckList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearStateCheckListAction() );
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

function filterCheckListsAction( isShow: boolean ): Object {
  return { type: FILTER_CHECKLIST_LIST, isShow };
}

function closeFilterCheckListsAction( isShow: boolean ): Object {
  return { type: CLOSE_FILTER_CHECKLIST, isShow };
}

function addNewPointForMyGeoPositionAction( isMyGeoPosition: boolean ): { type: string, isMyGeoPosition: boolean } {
  return { type: ADD_GEO_POINT_FROM_MY_POSITION, isMyGeoPosition };
}

function loadCheckListDataAction( checkList: IGeoListType ):
  { type: string, checkList: IGeoListType } {
  return { type: LOAD_CHECK_LIST_DATA, checkList };
}

function clearStateCheckListAction(): { type: string } {
  return { type: CLEAR_STATE_CHECK_LIST };
}