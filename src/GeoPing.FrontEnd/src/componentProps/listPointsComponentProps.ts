import { EnumStatusMarker, IMarker } from '../DTO/types/googleMapType';
import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IListPointsComponentProps {
  markers: Array<IMarker>;
  selectedMarkerId: string;

  editingPermission: ( isEditing: boolean ) => ( dispatch: IDispatchFunction ) => void;
  selectMarker: ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  putStatusMarker: ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => void;
  deleteMarker: ( idMarker: string ) => ( dispatch: IDispatchFunction ) => void;
}