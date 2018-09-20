import { EnumStatusMarker, IMarker } from '../DTO/types/googleMapType';
import IDispatchFunction from '../DTO/types/dispatchFunction';
import { addNewPoint } from '../actions/googleMapAction';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export default interface ICheckListComponentContainerProps {
  isEditingPoint: boolean;
  markers: Array<IMarker>;
  selectedMarker: IMarker;
  isAddMarker: boolean;
  isMarkerInstalled: boolean;
  isMarkerSaved: boolean;
  isMarkerCanceled: boolean;
  statusMarker: EnumStatusMarker;
  isCheckGeoPosition: boolean;

  editingPermission: ( isEditind: boolean ) => ( dispatch: IDispatchFunction ) => void;
  selectMarker: ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  editGEOPoint: ( idMarker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  changeDataGEOPoint: ( idMarker: string, field: string, value: string | number ) =>
    ( dispatch: IDispatchFunction ) => void;
  cancelEditingGEOPoint: () => ( dispatch: IDispatchFunction ) => void;
  addNewPoint: ( idMarker: string ) => ( dispatch: IDispatchFunction ) => void;
  permissionToAddMarker: ( isAddMarker: boolean ) => ( dispatch: IDispatchFunction ) => void;
  cancelAddNewPoint: () => ( dispatch: IDispatchFunction ) => void;
  addNotification: ( message: string, typeNotification: EnumNotificationType ) =>
    ( dispatch: IDispatchFunction ) => string;
  deleteNotification: ( idNotification: string ) => ( dispatch: IDispatchFunction ) => void;
  checkGEOPosition: () => ( dispatch: IDispatchFunction ) => void;
  markerInstalled: ( isMarkerInstaled: boolean ) => ( dispatch: IDispatchFunction ) => void;
  putStatusMarker: ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => void;
  deleteMarker: ( idMarker: string ) => ( dispatch: IDispatchFunction ) => void;
}