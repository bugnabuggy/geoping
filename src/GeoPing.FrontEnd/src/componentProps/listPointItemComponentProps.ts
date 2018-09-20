import IDispatchFunction from '../DTO/types/dispatchFunction';
import { EnumStatusMarker, IMarker } from '../DTO/types/googleMapType';

export default interface IListPointItemComponentProps {
  marker: IMarker;
  selectedMarkerId: string;

  editingPermission: ( isEditind: boolean ) => ( dispatch: IDispatchFunction ) => void;
  selectMarker: ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  putStatusMarker: ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => void;
  deleteMarker: ( idMarker: string ) => ( dispatch: IDispatchFunction ) => void;
}