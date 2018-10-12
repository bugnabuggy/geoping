import { EnumStatusMarker, IMarker } from '../types/stateTypes/googleMapStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IListPointsComponentProps {
  markers: Array<IMarker>;
  selectedMarkerId: string;

  editingPermission: ( isEditing: boolean ) => ( dispatch: IDispatchFunction ) => void;
  selectMarker: ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  putStatusMarker: ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => void;
  deleteMarker: ( idCheckList: string, idMarker: string  ) => ( dispatch: IDispatchFunction ) => void;
}