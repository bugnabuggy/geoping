import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';
import IGeoPoint from '../DTO/geoPointDTO';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IPublicListGeoPointListProps {
  googleMap: IGoogleMapStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
}