import { v4 as uuidV4 } from 'uuid';

import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  ADD_GEO_POINT_FROM_MY_POSITION,
  CHANGE_NAME_CHECK_LIST,
  CLEAR_STATE_CHECK_LIST,
  CLOSE_MODAL_FOR_CREATE_CHECK_LIST,
  CREATE_CHECK_LIST,
  EDITING_PERMISSION_POINT,
  IS_CHECK_LIST_PAGE,
  LOAD_CHECK_LIST_DATA,
  LOAD_MARKERS_FOR_CHECK_LIST,
  MODAL_PERIOD_OPEN_CLOSE,
  OPEN_MODAL_FOR_CREATE_CHECK_LIST,
  SELECT_CHECK_LIST,
  UPDATE_CHECK_LIST
} from '../constantsForReducer/checkList';
import { CLOSE_FILTER_CHECKLIST, FILTER_CHECKLIST_LIST, } from '../constantsForReducer/filters';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';
import { createNotification, getDataFromResponse } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { addNotificationAction } from './notificationsAction';
import { getLocationAddress } from '../services/httpMapService';
import StaticStorage from '../services/staticStorage';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import IGeoPoint from '../DTO/geoPointDTO';
import IGeoListType, { IGeoListForUpdateDTO } from '../DTO/geoListDTO';
import IMarkerServiceType from '../types/serviceTypes/markerServiceType';
import { addListPointsAction } from './googleMapAction';
import { windowBlockingAction } from './windowAction';

export const checkGEOPosition = () => ( dispatch: IDispatchFunction ) => {
  window.navigator.geolocation.getCurrentPosition(
    ( location: any ) => {
      getLocationAddress( location.coords.latitude, location.coords.longitude )
        .then( ( response: any ) => {
          const marker: IGeoPoint = {
            id: '',
            idList: '',
            name: '',
            radius: 0,
            description: response.data.results[ 0 ].formatted_address,
            lat: Number( location.coords.latitude ),
            lng: Number( location.coords.longitude ),
            idForMap: uuidV4(),
          };

          // dispatch( addPointAction( marker ) );
        } )
        .catch( ( error: any ) => {
          dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
        } );
    },
    ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
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
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};
export const filterCheckLists = () => ( dispatch: IDispatchFunction ) => {
  dashboardFiltersMockService( 'filterCheckLists' )
    .then( () => {
      dispatch( filterCheckListsAction( true ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
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
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const updateCheckList = ( idCheckList: string, checkList: IGeoListForUpdateDTO ) =>
  ( dispatch: IDispatchFunction ) => {
    dispatch( windowBlockingAction( true ) );
    const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
    checkListService.updateMyCheckList( idCheckList, checkList )
      .then( ( response: any ) => {
        dispatch( windowBlockingAction( false ) );
        dispatch( updateCheckListAction( response ) );
      } )
      .catch( ( error: any ) => {
        dispatch( windowBlockingAction( false ) );
        dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
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

export const loadCheckListData = ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );

  checkListService.loadMyCheckList( idCheckList )
    .then( ( response: any ) => {
      dispatch( loadCheckListDataAction( getDataFromResponse( response ) ) );
      dispatch( loadMarkersForCheckListAction( true ) );
      return markerService.getAllMarkersForCheckList( idCheckList );
    } )
    .then( ( response: any ) => {
      dispatch( addListPointsAction( getDataFromResponse( response ) ) );
      dispatch( loadMarkersForCheckListAction( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
      dispatch( loadMarkersForCheckListAction( false ) );
    } );
};

export const clearStateCheckList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearStateCheckListAction() );
};

export const selectCheckList = ( checkListId: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( selectCheckListAction( checkListId ) );
};

export const isCheckListPage = ( isCheckList: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( isCheckListPageAction( isCheckList ) );
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

function loadMarkersForCheckListAction( isLoading: boolean ): { type: string, isLoading: boolean } {
  return { type: LOAD_MARKERS_FOR_CHECK_LIST, isLoading };
}

function selectCheckListAction( checkListId: string ): { type: string, checkListId: string } {
  return { type: SELECT_CHECK_LIST, checkListId };
}

function updateCheckListAction( checkList: any ): { type: string, checkList: any } {
  return { type: UPDATE_CHECK_LIST, checkList };
}

function isCheckListPageAction( isCheckList: boolean ): { type: string, isCheckList: boolean } {
  return { type: IS_CHECK_LIST_PAGE, isCheckList };
}
