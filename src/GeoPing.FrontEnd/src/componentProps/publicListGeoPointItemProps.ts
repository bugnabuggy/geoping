import IGeoPoint from '../DTO/geoPointDTO';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IPublicListGeoPointItemProps {
  geoPoint: IGeoPoint;
  selectedGeoPoint: IGeoPoint;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
}