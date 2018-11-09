import IGeoPoint, { ICheckInGeoPointDTO } from '../../DTO/geoPointDTO';
import { EnumStatusMarker } from '../../enums/statusMarker';

export interface IPosition {
  lat: number;
  lng: number;
  isSuccess: boolean;
  address: string;
}

export interface IGoogleMapStateType {
  geoPoints: Array<IGeoPoint>;
  selectedGeoPoint: IGeoPoint;
  isAddMarker: boolean;
  position: IPosition;
  statusMarker: EnumStatusMarker;
  idDeleteMarker: string;
  moveStartMarker: { lat: number, lng: number };
  isGeoPointListIsCreated: boolean;
  checkInGeoPoint: Array<ICheckInGeoPointDTO>;
}