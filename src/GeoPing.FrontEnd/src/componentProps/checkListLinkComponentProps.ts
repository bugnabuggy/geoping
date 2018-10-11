import IDispatchFunction from '../DTO/types/dispatchFunction';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';
import { EnumStatusMarker, IMarker } from '../DTO/types/googleMapType';

export default interface ICheckListLinkComponentProps {
  selectedMarker: IMarker;
  isAddMarker: boolean;
  isMarkerInstalled: boolean;
  isMarkerSaved: boolean;
  isMarkerCanceled: boolean;
  isCheckGeoPosition: boolean;
  statusMarker: EnumStatusMarker;

  addNewPoint: ( idMarker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  permissionToAddMarker: ( isAddMarker: boolean ) => ( dispatch: IDispatchFunction ) => void;
  cancelAddNewPoint: () => ( dispatch: IDispatchFunction ) => void;
  addNotification: ( message: string, typeNotification: EnumNotificationType ) =>
    ( dispatch: IDispatchFunction ) => string;
  deleteNotification: ( idNotification: string ) => ( dispatch: IDispatchFunction ) => void;
  checkGEOPosition: () => ( dispatch: IDispatchFunction ) => void;
  putStatusMarker: ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => void;
  markerInstalled: ( isMarkerInstaled: boolean ) => ( dispatch: IDispatchFunction ) => void;
  editingPermission: ( isEditing: boolean ) => ( dispatch: IDispatchFunction ) => void;
}