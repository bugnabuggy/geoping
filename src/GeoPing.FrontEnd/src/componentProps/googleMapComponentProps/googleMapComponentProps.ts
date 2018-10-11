import IGoogleMapType, { EnumStatusMarker, IMarker, IPosition } from '../../DTO/types/googleMapType';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IGoogleMapComponentProps {
  isCheckIn: boolean;
  isEditing: boolean;
  selectedListId: string;
  googleMap: IGoogleMapType;

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
  deleteMarker: ( idCheckList: string, idMarker: string ) => ( dispatch: IDispatchFunction ) => void;
  userMarkerCreate: ( isCreate: boolean ) => ( dispatch: IDispatchFunction ) => void;
  markerRender: ( isMarkerRendered: boolean ) => ( dispatch: IDispatchFunction ) => void;
  addDistance: ( distance: number ) => ( dispatch: IDispatchFunction ) => void;
}