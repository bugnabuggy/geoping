import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IGeoPoint from '../DTO/geoPointDTO';
import { EnumStatusMarker } from '../enums/statusMarker';
import ICheckListStateType from '../types/stateTypes/checkListStateType';

export default interface IListPointItemComponentProps {
  geoPoint: IGeoPoint;
  selectedGeoPointId: string;
  statusGeoPoint: EnumStatusMarker;
  checkList: ICheckListStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  deleteGeoPoint: ( idPoint: string, statusMarker: EnumStatusMarker, idList?: string ) =>
    ( dispatch: IDispatchFunction ) => void;
}
