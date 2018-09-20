import IDispatchFunction from '../../DTO/types/dispatchFunction';
import { EnumStatusMarker, IMarker, IPosition } from '../../DTO/types/googleMapType';

export default interface IGoogleMapComponentContainerProps {
  markers: Array<IMarker>;
  isAddMarker: boolean;
  selectedMarker: IMarker;
  isThereIsNewMarker: boolean;
  newMarker: IMarker;
  isMarkerSaved: boolean;
  isMarkerCanceled: boolean;
  isMarkerInstalled: boolean;
  isCheckGeoPosition: boolean;
  statusMarker: EnumStatusMarker;
  position: IPosition;
  deleteIdMarker: string;

  addPoints: ( propsPoints: any ) => ( dispatch: IDispatchFunction ) => void;
  selectMarker: ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  moveStartMarker: ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => void;
  moveDragMarker: ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => void;
  moveEndMarker: ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => void;
  permissionToAddMarker: ( isAddMarker: boolean ) => ( dispatch: IDispatchFunction ) => void;
  editingPermission: ( isEditind: boolean ) => ( dispatch: IDispatchFunction ) => void;
  markerInstalled: ( isMarkerInstaled: boolean ) => ( dispatch: IDispatchFunction ) => void;
  cancelAddNewPoint: () => ( dispatch: IDispatchFunction ) => void;
  putStatusMarker: ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => void;
  findLocationForCenterMap: () => ( dispatch: IDispatchFunction ) => void;
  deleteMarker: ( idMarker: string ) => ( dispatch: IDispatchFunction ) => void;
}