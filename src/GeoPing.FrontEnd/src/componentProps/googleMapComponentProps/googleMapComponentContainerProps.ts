import IDispatchFunction from '../../DTO/types/dispatchFunction';
import { EnumStatusMarker, IMarker, IPosition } from '../../DTO/types/googleMapType';
import IGoogleMapType from '../../DTO/types/googleMapType';

export default interface IGoogleMapComponentContainerProps {
  isCheckIn: boolean;
  isEditing: boolean;
  selectedListId: string;
  googleMap: IGoogleMapType;

  addPoints: ( propsPoints: any ) => ( dispatch: IDispatchFunction ) => void;
  selectMarker: ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  moveStartMarker: ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => void;
  moveDragMarker: ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => void;
  moveEndMarker: ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => void;
  permissionToAddMarker: ( isAddMarker: boolean ) => ( dispatch: IDispatchFunction ) => void;
  editingPermission: ( isEditing: boolean ) => ( dispatch: IDispatchFunction ) => void;
  markerInstalled: ( isMarkerInstaled: boolean ) => ( dispatch: IDispatchFunction ) => void;
  cancelAddNewPoint: () => ( dispatch: IDispatchFunction ) => void;
  putStatusMarker: ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => void;
  findLocationForCenterMap: () => ( dispatch: IDispatchFunction ) => void;
  deleteMarker: ( idMarker: string ) => ( dispatch: IDispatchFunction ) => void;
  userMarkerCreate: ( isCreate: boolean ) => ( dispatch: IDispatchFunction ) => void;
  markerRender: ( isMarkerRendered: boolean ) => ( dispatch: IDispatchFunction ) => void;
  addDistance: ( distance: number ) => ( dispatch: IDispatchFunction ) => void;
}