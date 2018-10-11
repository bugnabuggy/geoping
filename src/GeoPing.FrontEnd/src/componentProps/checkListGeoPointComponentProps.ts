import { EnumStatusMarker, IMarker } from '../DTO/types/googleMapType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckListStateType from '../types/stateTypes/checkListStateType';

export default interface ICheckListGeoPointComponentProps {
  selectedMarker: IMarker;
  checkList: ICheckListStateType;
  isAddMarker: boolean;
  isMarkerInstalled: boolean;
  statusMarker: EnumStatusMarker;

  editGEOPoint: ( idMarker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  changeDataGEOPoint: ( idMarker: string, field: string, value: string | number ) =>
    ( dispatch: IDispatchFunction ) => void;
  cancelEditingGEOPoint: () => ( dispatch: IDispatchFunction ) => void;
  markerInstalled: ( isMarkerInstaled: boolean ) => ( dispatch: IDispatchFunction ) => void;
  cancelAddNewPoint: () => ( dispatch: IDispatchFunction ) => void;
  addNewPoint: ( idMarker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  editingPermission: ( isEditing: boolean ) => ( dispatch: IDispatchFunction ) => void;
  putStatusMarker: ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => void;
}