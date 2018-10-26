import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IGeoPoint from '../DTO/geoPointDTO';
import { EnumStatusMarker } from '../enums/statusMarker';
import ICheckListStateType from '../types/stateTypes/checkListStateType';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';

export default interface IListPointItemComponentProps {
  geoPoint: IGeoPoint;
  googleMap: IGoogleMapStateType;
  checkList: ICheckListStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  deleteGeoPoint: ( idPoint: string, statusMarker: EnumStatusMarker, idList?: string ) =>
    ( dispatch: IDispatchFunction ) => void;
}
